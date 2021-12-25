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

    static resize(A, size) {
        // resize 2D matrix to 2D matrix
        if (size.length > 2) {
            console.error("not implemented\nresize with n dim: " + size.length + "\nof: " + size)
        }
        if (size[0] != 0) {
            console.error("not implemented\nresize of nonvector, size=" + size)
        }

        ret = Array(size).fill(0)
    }

    static vec2mat(v) {
        return Array(1).fill(v)
    }

    static mat2vec(A) {
        if (A.length > 1) {
            console.error("cannot make vector multiple dimentions: " + A)
        }
        ret = Array(A[0].length).fill(0)
        for (let i = 0; i < v.length; i++) {
            ret[i] = A[0][i]
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
