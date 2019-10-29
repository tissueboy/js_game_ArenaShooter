export default class Calcs {
  constructor(config) {

  }
  returnMax1(_x,_y,_max){

    _max = _max ? _max : 1;//初期値の設定

    let arr = {
      x: _x,
      y: _y
    }

    let per = 0;
    let x = arr.x;
    let y = arr.y;
    let x_abs = Math.abs(arr.x);
    let y_abs = Math.abs(arr.y);

    if(x_abs >= y_abs){
      per = y_abs / x_abs;
      x = x >= 0 ? 1 : -1;
      y = y >= 0 ? 1 : -1;
      y = y*per;
    }else{
      per = x_abs / y_abs;
      x = x >= 0 ? 1 : -1;
      y = y >= 0 ? 1 : -1;
      x = x*per;
    }

    arr.x = x * _max;
    arr.y = y * _max;

    return arr;
  }
}
