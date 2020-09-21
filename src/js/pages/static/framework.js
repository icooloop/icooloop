/**
 * Created by lidy on 2018/6/20.
 */
import {Ring, setArea} from '../../../js/tools/chart'
class UserAssets {
    constructor(contents = []) {
        this.init();//初始化
    }

    init() {
        this.circle()//环形图
    }

    circle() {
        //年龄结构
        let ctx = setArea($('#personAgeCanvas'), 180, 180);//设置宽高倍数
        let ring = new Ring(77, 26, {title:'年龄结构',bgColor:'#fff'}, "butt");
        ring.drawRing(ctx, 1.5 * Math.PI,totalArr, 90, 90);
        //学历结构
        let ctx2 = setArea($('#personEducationCanvas'), 180, 180);//设置宽高倍数
        let ring2 = new Ring(77, 26, {title:'学历结构',bgColor:'#fff'}, "butt");
        ring2.drawRing(ctx2, 1.5 * Math.PI,totalArr2, 90, 90);
    }
}
const userAssets = new UserAssets();