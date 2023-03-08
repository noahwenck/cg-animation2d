class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // limit_fps_flag:      bool 
    // fps:                 int
    constructor(canvas, limit_fps_flag, fps) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.limit_fps = limit_fps_flag;
        this.fps = fps;
        this.start_time = null;
        this.prev_time = null;

        this.s1theta = 0;   // Theta for First Spinning Polygon
        this.s2theta = 0;   // Theta for Second Spinning Polygon
        this.s3theta = 0;   // Theta for Third Spinning Polygon


        // Values for Polygon_1 for Slide2 (3rd Slide)
        this.square_slide_2 = [
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1)
        ];
        this.square_slide_2[0].values = [175, 250, 1]; // Right | Down
        this.square_slide_2[1].values = [100, 330, 1]; // Left  | Down
        this.square_slide_2[2].values = [160, 310, 1]; // Left  | Up
        this.square_slide_2[3].values = [250, 350, 1]; // Right | Up

        // Kebab Example in Slide2 (3rd Slide)
        // True Means Going UP
        this.square_up_00 = true;
        this.square_up_01 = false;
        this.square_up_10 = true;
        this.square_up_11 = true;

        // True Means Going LEFT
        this.square_left_00 = true;
        this.square_left_01 = true;
        this.square_left_10 = true;
        this.square_left_11 = true;
        this.tester = 0;



    }

    // flag:  bool
    limitFps(flag) {
        this.limit_fps = flag;
    }

    // n:  int
    setFps(n) {
        this.fps = n;
    }

    // idx: int
    setSlideIndex(idx) {
        this.slide_idx = idx;
    }

    animate(timestamp) {
        // Get time and delta time for animation
        if (this.start_time === null) {
            this.start_time = timestamp;
            this.prev_time = timestamp;
        }
        let time = timestamp - this.start_time;
        let delta_time = timestamp - this.prev_time;
        //console.log('animate(): t = ' + time.toFixed(1) + ', dt = ' + delta_time.toFixed(1));

        // Update transforms for animation
        this.updateTransforms(time, delta_time);

        // Draw slide
        this.drawSlide();

        // Invoke call for next frame in animation
        if (this.limit_fps) {
            setTimeout(() => {
                window.requestAnimationFrame((ts) => {
                    this.animate(ts);
                });
            }, Math.floor(1000.0 / this.fps));
        }
        else {
            window.requestAnimationFrame((ts) => {
                this.animate(ts);
            });
        }

        // Update previous time to current one for next calculation of delta time
        this.prev_time = timestamp;
    }

    //
    updateTransforms(time, delta_time) {
        // TODO: update any transformations needed for animation

        // Updates for slide 1
        this.s1theta = time / 4;
        this.s2theta = -time;
        this.s3theta = 2 * time;
    }
    
    //
    drawSlide() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0();
                break;
            case 1:
                this.drawSlide1();
                break;
            case 2:
                this.drawSlide2();
                break;
            case 3:
                this.drawSlide3();
                break;
        }
    }

    //
    drawSlide0() {
        // TODO: draw bouncing ball (circle that changes direction whenever it hits an edge)
        
        
        // Following line is example of drawing a single polygon
        // (this should be removed/edited after you implement the slide)
        let diamond = [
            Vector3(400, 150, 1),
            Vector3(500, 300, 1),
            Vector3(400, 450, 1),
            Vector3(300, 300, 1)
        ];
        let teal = [0, 128, 128, 255];
        this.drawConvexPolygon(diamond, teal);
    }

    //
    drawSlide1() {
        // TODO: draw at least 3 polygons that spin about their own centers
        //   - have each polygon spin at a different speed / direction
        
        let black = [0, 0, 0, 255];

        //
        //  First Poly
        //
        let square = [
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1)
        ]
        square[0].values = [200, 200, 1];
        square[1].values = [250, 200, 1];
        square[2].values = [250, 250, 1];
        square[3].values = [200, 250, 1];

        // Change matrix for First Poly
        let trans = new Matrix(3, 3);
        trans.values = mat3x3Translate(mat3x3Identity, 225, 225);
        let trans2 = new Matrix(3, 3);
        trans2.values = mat3x3Translate(mat3x3Identity, -225, -225);
        let rotate = new Matrix(3, 3);
        rotate.values = mat3x3Rotate(mat3x3Identity, this.s1theta);
        let schange = new Matrix(3, 3);
        schange = Matrix.multiply([trans, rotate, trans2]);

        //  Change Poly 1 Verts
        for (let i = 0; i < square.length; i++) {
            square[i] = Matrix.multiply([schange, square[i]]);
        } 
        this.drawConvexPolygon(square, black);

        //
        // Second Poly
        //
        let hex = [
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1)
        ];
        hex[0].values = [400, 400, 1];
        hex[1].values = [450, 400, 1];
        hex[2].values = [500, 450, 1];
        hex[3].values = [450, 500, 1];
        hex[4].values = [400, 500, 1];
        hex[5].values = [350, 450, 1];
        
        // Change mat for poly 2
        trans.values = mat3x3Translate(mat3x3Identity, 425, 450);
        trans2.values = mat3x3Translate(mat3x3Identity, -425, -450);
        rotate.values = mat3x3Rotate(mat3x3Identity, this.s2theta);
        schange = Matrix.multiply([trans, rotate, trans2]);

        // Change poly 2 verts
        for (let i = 0; i < hex.length; i++) {
            hex[i] = Matrix.multiply([schange, hex[i]]);
        } 
        this.drawConvexPolygon(hex, black);

        //
        // Third Poly
        //
        let octo = [
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1)
        ];
        octo[0].values = [400, 100, 1];
        octo[1].values = [425, 100, 1];
        octo[2].values = [450, 125, 1];
        octo[3].values = [450, 150, 1];
        octo[4].values = [425, 175, 1];
        octo[5].values = [400, 175, 1];
        octo[6].values = [375, 150, 1];
        octo[7].values = [375, 125, 1];

        // Change mat for poly 2
        trans.values = mat3x3Translate(mat3x3Identity, 412.5, 137.5);
        trans2.values = mat3x3Translate(mat3x3Identity, -412.5, -137.5);
        rotate.values = mat3x3Rotate(mat3x3Identity, this.s3theta);
        schange = Matrix.multiply([trans, rotate, trans2]);

        // Change poly 2 verts
        for (let i = 0; i < octo.length; i++) {
            octo[i] = Matrix.multiply([schange, octo[i]]);
        } 
        this.drawConvexPolygon(octo, black);


    }

    //
    drawSlide2() {
        // TODO: draw at least 2 polygons grow and shrink about their own centers
        //   - have each polygon grow / shrink different sizes
        //   - try at least 1 polygon that grows / shrinks non-uniformly in the x and y directions


        /*
         Alright -- Firstly we be listening to Formula - Labyrinth
         YER
         growing/shrinking seems kinda sus but its cool.
         We should create a polygon that grows by some X and by Some Y, where teh individual points get transfromed


         Suppose we have Polygon:
         *---*
         |   |
         *---*
         a,b,c,d are points

         Growth occurs if we split Through the middle Like this:
                      |
         *----*    *--|--*
         |    |    |  |  |  // Broski Looks like a kebab
       ----------  |  |  |
         |    |    *--|--*
         *----*       |


         Nowm, comparativly speaking, we have side A_0 and B_0 for X axis; Side A_1 and B_1 for Y axis

         this sucks ass cause polygons tend to have motherfuckin rainbows in thei ass...

         Solutions:
         1) We must use some form of algorithm to find general middle of the dudes
         1.1) Idk why we would wanna make things complicated if shits static anyways (not user defined)
         2) We must use some form of simplification/ SHORTCUT
         2.1) We simply count total number of edges and MANUALLY say "Yo, broski, these three to the left are going left"
         2.2) This will simplify and make for quick progression


        How do we create a loop which changes X and Y at different rates and looks like and accordion????
        We simply create a while Loop which updates the individual X and Y points of the polygon points. Tada.



        Algorithm Left/Right:
        - Make sure we slowly incriment the scale *NO MULTIPLICATION* Only Addition
        - - Problem 1:
        - - - We Could Use Multiplication if we Use Matrix as feature in function -> Input
        - - - This would Allow us to Just RETURN whatever the correct values would be and the we
        - - - set the actual values of the Matrix to the CORRECT Values
        - - - Problems with this -> Could be SLOW as well as lots of code.
        - - Solution 1:
        - - - Slightly incrementing values by 0.01 (OR 0.005) with each FRAME
        - - - - How would we UPDATE? Need global Variable?? Would Assume so.
        - - - - OR We just say "Fuck it, we ball" and just create function and see what happens
        - - - - - I Vote for this - I am the only one voting - I win
        - - - Additionally: ADD Some RANDOMNESS to the Whole process
        - - - - Switch between Update of 0.01 to 0.005 or something -> Not too Uniform
        - - Final Solution:
        - - - Simply create functions
        - - - We might need Four functions
        - - - - Depending on Where Which point is, we change the type of Function being Called
        - - - - - This is because points move LEFT AND RIGHT -> Therefore Utilize both functions

        */


        // We first create 4 points polygon
        // Yes I looked up wtf a polygon is - dont come at me

        let random_num = Math.floor(Math.random() + 0.5);
        let temp_points = [this.square_slide_2[0], this.square_slide_2[1]];
        let move_up = this.scale_triangle(this.square_left_01, temp_points, 75, 300, random_num, true);
        this.square_left_01 = move_up[0];
        this.square_slide_2[0] = move_up[1][0];
        this.square_slide_2[1] = move_up[1][1];


        random_num = Math.floor(Math.random() + 0.5);
        temp_points = [this.square_slide_2[2], this.square_slide_2[3]];
        move_up = this.scale_triangle(this.square_left_00, temp_points, 100, 400, random_num, false);
        this.square_left_00 = move_up[0];
        this.square_slide_2[2] = move_up[1][0];
        this.square_slide_2[3] = move_up[1][1];

        random_num = Math.floor(Math.random() + 0.5);
        temp_points = [this.square_slide_2[1], this.square_slide_2[2]];
        move_up = this.scale_triangle(this.square_left_10, temp_points, 50, 350, random_num, true);
        this.square_left_10 = move_up[0];
        this.square_slide_2[1] = move_up[1][0];
        this.square_slide_2[2] = move_up[1][1];

        this.drawConvexPolygon(this.square_slide_2, [255, 128, 128, 128]);


    }

    // Manually Added Function for Scaling Triangles
    scale_triangle(direction_anchor, points, lower_bound, upper_bound, random_num, move_horizontal) {
        let temp = new Matrix(3, 3);
        let x_or_y = 0; // Use either X or Y coordinates for calculating Scaling
        if (!move_horizontal) {
            x_or_y = 1;
        }
        // Make it an anchor to be universal for other callers
        if (direction_anchor) {
                // Instead of calling the WHOLE polygon, we just call a single point values
                // We replaced hard-coded values with fluid parameter values
                // This Makes sure that IF EITHER point reaches the boundary, we start moving in the opposite direction
                for (let x = 0; x < points.length; x++) {
                    if (points[x].values[x_or_y] <= lower_bound) {
                        return [false, points];
                    }
                }

                // This assures we can switch between horizontal and Vertical movement
                if (move_horizontal) {
                    temp.values = mat3x3Scale(mat3x3Identity, 0.99 + (0.005 * random_num), 1);
                } else {
                    temp.values = mat3x3Scale(mat3x3Identity, 1, 0.99 + (0.005 * random_num));
                }
                // Instead of calling the WHOLE polygon, we just call a single point
                for (let x = 0; x < points.length; x++) {
                    points[x] = Matrix.multiply([temp, points[x]]);
                }

                return [true, points];

            } else {
                // Instead of calling the WHOLE polygon, we just call a single point values
                // We replaced hard-coded values with fluid parameter values
                // This Makes sure that IF EITHER point reaches the boundary, we start moving in the opposite direction
                for (let x = 0; x < points.length; x++) {
                    if (points[x].values[x_or_y] >= upper_bound) {
                        return [true, points];
                    }
                }

                // This assures we can switch between horizontal and Vertical movement
                if (move_horizontal) {
                    temp.values = mat3x3Scale(mat3x3Identity, 1.01 - (0.005 * random_num), 1);
                } else {
                    temp.values = mat3x3Scale(mat3x3Identity, 1, 1.01 - (0.005 * random_num));
                }
                // Instead of calling the WHOLE polygon, we just call a single point
                for (let x = 0; x < points.length; x++) {
                    points[x] = Matrix.multiply([temp, points[x]]);
                }

                return [false, points];
            }
       }



    //
    drawSlide3() {
        // TODO: get creative!
        //   - animation should involve all three basic transformation types
        //     (translation, scaling, and rotation)

        // Let's just be so creative and quirky like omfg AHHHHHHH SO FUN!!!
        // It's giving.... It's giving.... It's giving....


        
    }
    
    // vertex_list:  array of object [Matrix(3, 1), Matrix(3, 1), ..., Matrix(3, 1)]
    // color:        array of int [R, G, B, A]
    drawConvexPolygon(vertex_list, color) {
        this.ctx.fillStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3] / 255) + ')';
        this.ctx.beginPath();
        let x = vertex_list[0].values[0][0] / vertex_list[0].values[2][0];
        let y = vertex_list[0].values[1][0] / vertex_list[0].values[2][0];
        this.ctx.moveTo(x, y);
        for (let i = 1; i < vertex_list.length; i++) {
            x = vertex_list[i].values[0][0] / vertex_list[i].values[2][0];
            y = vertex_list[i].values[1][0] / vertex_list[i].values[2][0];
            this.ctx.lineTo(x, y);
        }
        this.ctx.closePath();
        this.ctx.fill();
    }
};
