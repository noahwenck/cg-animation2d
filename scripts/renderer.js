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

        this.s0x = 3;
        this.s0y = 3;
        this.square = [
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1)
        ]
        this.square[0].values = [200, 200, 1];
        this.square[1].values = [250, 200, 1];
        this.square[2].values = [250, 250, 1];
        this.square[3].values = [200, 250, 1];

        this.circle = [new Matrix(3, 1)];
        this.circle[0].values = [200, 300, 1];
        for (let i = 1; i < 20; i++) {
            this.circle[i] = new Matrix(3, 1);
            let x = parseInt(200 + 50 * Math.cos((i * 18) * (Math.PI / 180)));
            //let y = parseInt(200 + 50 * Math.sin((i * 6) * (Math.PI / 180)));
            let y = parseInt(300 + 50 * Math.sin((i * 18) * (Math.PI / 180)));
            this.circle[i].values = [x, y, 1];
        }

        this.s1theta = 0;   // Theta for First Spinning Polygon
        this.s2theta = 0;   // Theta for Second Spinning Polygon
        this.s3theta = 0;   // Theta for Third Spinning Polygon


        // Values for Polygon_1 for Slide2 (3rd Slide)
        this.square_0_slide_2 = [
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1)
        ];
        this.square_0_slide_2[0].values = [175, 250, 1]; // Right | Down
        this.square_0_slide_2[1].values = [100, 330, 1]; // Left  | Down
        this.square_0_slide_2[2].values = [160, 310, 1]; // Left  | Up
        this.square_0_slide_2[3].values = [250, 350, 1]; // Right | Up

        this.square_1_slide_2 = [
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1),
            new Matrix(3, 1)
        ];
        this.square_1_slide_2[0].values = [400, 460, 1];
        this.square_1_slide_2[1].values = [460, 460, 1];
        this.square_1_slide_2[2].values = [480, 470, 1];
        this.square_1_slide_2[3].values = [600, 450, 1];
        this.square_1_slide_2[4].values = [440, 530, 1];
        this.square_1_slide_2[5].values = [350, 490, 1];

        // Kebab Example in Slide2 (3rd Slide)
        // True Means Going UP
        this.square_0_00 = true;
        this.square_0_01 = false;
        this.square_0_10 = true;
        this.square_0_11 = true;

        // True Means Going LEFT
        this.square_1_00 = true;
        this.square_1_01 = true;
        this.square_1_10 = true;
        this.square_1_11 = true;
        this.square_1_001 = true;
        this.square_1_011 = true;
        this.square_1_010 = true;




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

        //MAYBE DON'T UPDATE THE SAME POLYGON THIS MIGHT BE IT GENTS LETS FUCKIN GO
        // Updates for Slide 0
        if (delta_time != 0) {
            //this.s0x = delta_time / 4;
           //this.s0y = delta_time / delta_time;
        }
       

        // Updates for slide 1
        this.s1theta = time / 4;
        this.s2theta = -time;
        this.s3theta = time / 20;
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
        
        let teal = [0, 128, 128, 255];
/*
        // 
        //  Corcle
        //  dont look at the verts please
        let circle = [new Matrix(3, 1)];
        circle[0].values = [200, 300, 1];
        for (let i = 1; i < 20; i++) {
            circle[i] = new Matrix(3, 1);
            let x = parseInt(200 + 50 * Math.cos((i * 18) * (Math.PI / 180)));
            //let y = parseInt(200 + 50 * Math.sin((i * 6) * (Math.PI / 180)));
            let y = parseInt(300 + 50 * Math.sin((i * 18) * (Math.PI / 180)));
            circle[i].values = [x, y, 1];
        }*/

        let trans = new Matrix(3, 3);
        trans.values = mat3x3Translate(mat3x3Identity, this.s0x, this.s0y);
        //console.log(trans);

        for (let i = 0; i < this.circle.length; i++) {
            for (let x = 0; x < this.circle.length; x++) {
                if (Matrix.multiply([trans, this.circle[i]]).values[0] < 0 || Matrix.multiply([trans, this.circle[i]]).values[0] > 800) {
                    this.s0x = -this.s0x;
                    break;  // this might be problematic, try just testing center?
                    
                }
                console.log(this.s0x);
            }
            this.circle[i] = Matrix.multiply([trans, this.circle[i]]);
        }
        for (let i = 0; i < this.circle.length; i++) {
                if (Matrix.multiply([trans, this.circle[i]]).values[1] < 0 || Matrix.multiply([trans, this.circle[i]]).values[1] > 600) {
                    this.s0y = -this.s0y;
                    break;
                }
        }
        trans.values = mat3x3Translate(mat3x3Identity, this.s0x, this.s0y);
        /*for (let i = 0; i < this.circle.length; i++) {
            this.cicle[i] = Matrix.multiply([trans, this.circle[i]]);
        }*/
        

        for (let i = 1; i < this.circle.length - 1; i++) {
            this.drawConvexPolygon([this.circle[0], this.circle[i], this.circle[i+1]], teal);
        }
        this.drawConvexPolygon([this.circle[0], this.circle[1], this.circle[this.circle.length - 1]], teal);

        // KEEP BECAUSE THIS KIND OF WORKS
/*
        //this.drawConvexPolygon(this.square, teal);

        let trans = new Matrix(3, 3);
        trans.values = mat3x3Translate(mat3x3Identity, this.s0x, this.s0y);
       

        for (let i = 0; i < this.square.length; i++) {
            for (let x = 0; x < this.square.length; x++) {
                if (Matrix.multiply([trans, this.square[i]]).values[0] < 0 || Matrix.multiply([trans, this.square[i]]).values[0] > 800) {
                    this.s0x = -this.s0x;
                }
                if (Matrix.multiply([trans, this.square[i]]).values[1] < 0 || Matrix.multiply([trans, this.square[i]]).values[1] > 600) {
                    this.s0y = -this.s0y;
                }
                console.log(this.s0x);
                trans.values = mat3x3Translate(mat3x3Identity, this.s0x, this.s0y);
            }
            this.square[i] = Matrix.multiply([trans, this.square[i]]);
        }
        this.drawConvexPolygon(this.square, teal);*/

    }

    //
    drawSlide1() {
        
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

        this.rotate(square, black, 225, 225, this.s1theta);

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

        this.rotate(hex, black, 425, 450, this.s2theta);

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

        this.rotate(octo, black, 412.5, 137.5, this.s3theta);

    }

    // Rotate Function calculates the matrix needed to rotate the shape and rotates the shape
    // tx - X Value of Center of Shape
    // ty - Y Value of Center of Shape
    // theta - Degree for the shape to be rotated by
    rotate(shape, color, tx, ty, theta) {

        // Creates The Change Matrix for the Polygon
        let trans = new Matrix(3, 3);
        let trans2 = new Matrix(3, 3);
        let rotate = new Matrix(3, 3);
        let schange = new Matrix(3, 3);
        trans.values = mat3x3Translate(mat3x3Identity, tx, ty);
        trans2.values = mat3x3Translate(mat3x3Identity, -tx, -ty);
        rotate.values = mat3x3Rotate(mat3x3Identity, theta);
        schange = Matrix.multiply([trans, rotate, trans2]);

        // Updates the Polygons Vertices
        for (let i = 0; i < shape.length; i++) {
            shape[i] = Matrix.multiply([schange, shape[i]]);
        } 
        this.drawConvexPolygon(shape, color);

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
        let temp_points = [this.square_0_slide_2[0], this.square_0_slide_2[1]];
        let move_up = this.scale_triangle(this.square_0_01, temp_points, 75, 300, random_num, true, 1, 0.005);
        this.square_0_01 = move_up[0];
        this.square_0_slide_2[0] = move_up[1][0];
        this.square_0_slide_2[1] = move_up[1][1];

        random_num = Math.floor(Math.random() + 0.5);
        temp_points = [this.square_0_slide_2[2], this.square_0_slide_2[3]];
        move_up = this.scale_triangle(this.square_0_00, temp_points, 100, 400, random_num, false, 1, 0.005);
        this.square_0_00 = move_up[0];
        this.square_0_slide_2[2] = move_up[1][0];
        this.square_0_slide_2[3] = move_up[1][1];

        random_num = Math.floor(Math.random() + 0.5);
        temp_points = [this.square_0_slide_2[1], this.square_0_slide_2[2]];
        move_up = this.scale_triangle(this.square_0_10, temp_points, 50, 350, random_num, true, 1, 0.005);
        this.square_0_10 = move_up[0];
        this.square_0_slide_2[1] = move_up[1][0];
        this.square_0_slide_2[2] = move_up[1][1];

        // Draw First Square
        this.drawConvexPolygon(this.square_0_slide_2, [255, 100, 100, 255]);


        random_num = Math.floor(Math.random() + 0.5);
        temp_points = [this.square_1_slide_2[0], this.square_1_slide_2[1]];
        move_up = this.scale_triangle(this.square_1_00, temp_points, 350, 580, random_num, false, 3, 0.0005);
        this.square_1_00 = move_up[0];
        this.square_1_slide_2[0] = move_up[1][0];
        this.square_1_slide_2[1] = move_up[1][1];

        random_num = Math.floor(Math.random() + 0.5);
        temp_points = [this.square_1_slide_2[1], this.square_1_slide_2[2]];
        move_up = this.scale_triangle(this.square_1_01, temp_points, 400, 750, random_num, true, 3, 0.0005);
        this.square_1_01 = move_up[0];
        this.square_1_slide_2[1] = move_up[1][0];
        this.square_1_slide_2[2] = move_up[1][1];

        random_num = Math.floor(Math.random() + 0.5);
        temp_points = [this.square_1_slide_2[3], this.square_1_slide_2[4]];
        move_up = this.scale_triangle(this.square_1_10, temp_points, 400, 750, random_num, true, 3, 0.0005);
        this.square_1_10 = move_up[0];
        this.square_1_slide_2[3] = move_up[1][0];
        this.square_1_slide_2[4] = move_up[1][1];

        random_num = Math.floor(Math.random() + 0.5);
        temp_points = [this.square_1_slide_2[4], this.square_1_slide_2[5]];
        move_up = this.scale_triangle(this.square_1_11, temp_points, 400, 550, random_num, false, 3, 0.0005);
        this.square_1_11 = move_up[0];
        this.square_1_slide_2[4] = move_up[1][0];
        this.square_1_slide_2[5] = move_up[1][1];

        random_num = Math.floor(Math.random() + 0.5);
        temp_points = [this.square_1_slide_2[0], this.square_1_slide_2[3]];
        move_up = this.scale_triangle(this.square_1_001, temp_points, 400, 550, random_num, false, 3, 0.0005);
        this.square_1_001 = move_up[0];
        this.square_1_slide_2[0] = move_up[1][0];
        this.square_1_slide_2[3] = move_up[1][1];

        random_num = Math.floor(Math.random() + 0.5);
        temp_points = [this.square_1_slide_2[2], this.square_1_slide_2[5]];
        move_up = this.scale_triangle(this.square_1_011, temp_points, 330, 580, random_num, false, 3, 0.0005);
        this.square_1_011 = move_up[0];
        this.square_1_slide_2[2] = move_up[1][0];
        this.square_1_slide_2[5] = move_up[1][1];

        random_num = Math.floor(Math.random() + 0.5);
        temp_points = [this.square_1_slide_2[2], this.square_1_slide_2[5]];
        move_up = this.scale_triangle(this.square_1_010, temp_points, 400, 700, random_num, true, 3, 0.0005);
        this.square_1_010 = move_up[0];
        this.square_1_slide_2[2] = move_up[1][0];
        this.square_1_slide_2[5] = move_up[1][1];

        // Draw Second Square
        this.drawConvexPolygon(this.square_1_slide_2, [80, 40, 255, 255]);




    }

    // Manually Added Function for Scaling Triangles
    scale_triangle(direction_anchor, points, lower_bound, upper_bound, random_num, move_horizontal, speed, rand_update) {
        let temp = new Matrix(3, 3);
        if (speed == 0.0) {
            console.log("Speed Must be Larger than 0.0 (> 0.0)")
        }
        let reduce = 1.0 - (0.01 / speed);
        let increase = 1.0 + (0.01 / speed);

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
                    temp.values = mat3x3Scale(mat3x3Identity, reduce + (rand_update * random_num), 1);
                } else {
                    temp.values = mat3x3Scale(mat3x3Identity, 1, reduce + (rand_update * random_num));
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
                    temp.values = mat3x3Scale(mat3x3Identity, increase - (rand_update * random_num), 1);
                } else {
                    temp.values = mat3x3Scale(mat3x3Identity, 1, increase - (rand_update * random_num));
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
