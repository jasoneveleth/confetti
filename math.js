class math {
    // takes in 2 matrices returns AB
    static matmul(A, B) {
        if (A[0].length != B.length) {
            throw 'invalid sizes'
        }

        let C = math.zeros(A.length, B[0].length)

        for (let i = 0; i < C.length; i++) {
            // rows of C (rows of A)
            for (let j = 0; j < C[0].length; j++) {
                // columns of C (columns of B)
                for (let k = 0; k < B.length; k++) {
                    // columns of A, rows of B
                    C[i][j] += A[i][k] * B[k][j]
                }
            }
        }
        stop = 1
        return C
    }

    static max(a, b) {
        if (a > b) {
            return a
        } else {
            return b
        }
    }

    static matscale(A, c) {
        //scale A by c
        const ret = math.zeros(A.length, A[0].length)
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < A[0].length; j++) {
                ret[i][j] = c * A[i][j]
            }
        }
        return ret
    }

    static matadd(A, B) {
        // add two matrices A and B
        const ret = math.zeros(A.length, A[0].length)
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < A[0].length; j++) {
                ret[i][j] = A[i][j] + B[i][j]
            }
        }
        return ret
    }

    static zeros(rows, cols) {
        // returns a matrix filled with zeros
        return Array(rows).fill(0).map(_ => Array(cols).fill(0))
    }

    static printmat(A) {
        // print matrix
        let s = "["
        for (let i = 0; i < A.length; i++) {
            s += "["
            for (let j = 0; j < A[0].length; j++) {
                s += Math.round(A[i][j] * 1000) / 1000
                s += ", "
            }
            s += "]\n"
        }
        s += "]"
        console.log(s)
    }

    /* 3d rotation matricies */
    static xrot(theta) {
        const R = math.zeros(3, 3)
        R[0][0] = 1
        R[1][1] = Math.cos(theta)
        R[1][2] = -Math.sin(theta)
        R[2][1] = Math.sin(theta)
        R[2][2] = Math.cos(theta)
        return R
    }
    static yrot(theta) {
        const R = math.zeros(3, 3)
        R[0][0] = Math.cos(theta)
        R[0][2] = Math.sin(theta)
        R[1][1] = 1
        R[2][0] = -Math.sin(theta)
        R[2][2] = Math.cos(theta)
        return R
    }
    static zrot(theta) {
        const R = math.zeros(3, 3)
        R[0][0] = Math.cos(theta)
        R[0][1] = -Math.sin(theta)
        R[1][0] = Math.sin(theta)
        R[1][1] = Math.cos(theta)
        R[2][2] = 1
        return R
    }

    static world2image(world_coords) {
        // copy
        // world_coords = JSON.parse(JSON.stringify(world_coords))

        // augmented coord
        world_coords.push([1])

        // the camera matrices are resized in window_resize function
        const image_coord_aug = math.matmul(K, math.matmul(Rt, world_coords))
        const image_coord = [image_coord_aug[0][0]/image_coord_aug[2][0], image_coord_aug[1][0]/image_coord_aug[2][0]]
        const screen_coord = [WIDTH / 2 - image_coord[0], HEIGHT / 2 - image_coord[1]]
        return screen_coord
    }
}

