function isIntersecting(_r1x, _r1y, _r2x, _r2y, _r2w, _r1w) {
    if(((_r1x > (_r2x + _r2w)) || (_r2x > (_r1x + _r1w)))) {
        if((_r1y > (_r2y + _r2w)) || ((_r2y + _r2w) > (_r1y + _r1w))) {
            return false;
        }
    }
    else if((_r1y > (_r2y + _r2w)) || ((_r2y + _r2w) > (_r1y + _r1w))) {
        if(((_r1x > (_r2x + _r2w)) || (_r2x > (_r1x + _r1w)))) {
            return false;
        }
    }
    else {
        return true;
    }
}