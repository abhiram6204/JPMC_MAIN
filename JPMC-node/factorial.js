function fact(n) //*****THIS IS A MODULE*****
{
    if(n==1)
        return 1
    else
        return n*fact(n-1)
}
module.exports.fact=fact