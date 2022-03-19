class math {
    static matmul(A, B) {
        // takes in 2 matrices returns AB
        let C = math.matrix(B[0].length, A.length)

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
        return C
    }

    static matadd(A, B) {
        // add two matrices A and B
        const ret = math.matrix(A.length, A[0].length)
        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < A[0].length; j++) {
                ret[i][j] = A[i][j] + B[i][j]
            }
        }
        return ret
    }

    static vec2mat(v) {
        // 3d vec to 3x1 matrix
        const ret = Array(v.length)
        for (let i = 0; i < v.length; i++) {
            ret[i] = [v[i]]
        }
        return ret
    }

    static mat2vec(A) {
        // 3x1 matrix to 3d vec
        const ret = Array(A[0].length).fill(0)
        for (let i = 0; i < v.length; i++) {
            ret[i] = A[i][0]
        }
        return ret
    }

    static matrix(rows, cols) {
        // returns a matrix filled with zeros
        return Array(rows).fill(0).map(x => Array(cols).fill(0))
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
        const R = math.matrix(3, 3)
        R[0][0] = 1
        R[1][1] = Math.cos(theta)
        R[1][2] = Math.sin(theta)
        R[2][1] = -Math.sin(theta)
        R[2][2] = Math.cos(theta)
        return R
    }
    static yrot(theta) {
        const R = math.matrix(3, 3)
        R[0][0] = Math.cos(theta)
        R[0][2] = -Math.sin(theta)
        R[1][1] = 1
        R[2][0] = Math.sin(theta)
        R[2][2] = Math.cos(theta)
        return R
    }
    static zrot(theta) {
        const R = math.matrix(3, 3)
        R[0][0] = Math.cos(theta)
        R[0][1] = Math.sin(theta)
        R[1][0] = -Math.sin(theta)
        R[1][1] = Math.cos(theta)
        R[2][2] = 1
        return R
    }
}
