let n = 4;
let m = 4;
 

function findPossibleMoves(mat, p, q)
{

    let X = [ 2, 1, -1, -2, -2, -1, 1, 2 ];
    let Y = [ 1, 2, 2, 1, -1, -2, -2, -1 ];

    let count = 0;


    for (let i = 0; i < 8; i++) {

        
        let x = p + X[i];
        let y = q + Y[i];

        
        if (x >= 0 && y >= 0 && x < n && y < m && mat[x][y] == 0)
            count++;
    }

    
    return count;
}
 
let mat = [ [ 1, 0, 1, 0 ],
           [ 0, 1, 1, 1 ],
           [ 1, 1, 0, 1 ],
           [ 0, 1, 1, 1 ] ];

let p = 2, q = 2;

console.log(findPossibleMoves(mat, p, q));