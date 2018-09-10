/**
 * Created by ly on 2017/3/16.
 */
var pointArray = new Array();
function creatLevel(w,h,id){
    this.width = w;
    this.height = h;
    this.selector = document.getElementById(id);
}
creatLevel.prototype.init=function(){
    this.svg = d3.select(this.selector).append("svg")
        .attr("width", this.width)
        .attr("height", this.height)
        .append("g");
    var p=this.svg.append("path")
        .attr("stroke", "blue")
        .attr("stroke-width", 3)
        .attr("fill", "none")
        .attr("d", this.gear(300,this.width/2,this.height/2));
    for(var i=0;i<5;i++){
        this.svg.append("path")
            .attr("stroke", "#999")
            .attr("stroke-width", 1)
            .attr("fill", "none")
            .attr("stroke-dasharray", "3 5")
            .attr("d", this.gear(250-(i*50),this.width/2,this.height/2));
    }
    this.setText(300,this.width/2,this.height/2);
    var line=this.svg.append("path")
        .attr("stroke", "#444")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("d", this.creatline);
}
/*
 *  绘制正五边形
 *param N:边长 X:中心点横坐标 Y:中心点纵坐标
 * */
creatLevel.prototype.gear=function(N,X,Y){
    var point = {"x":X,"y":Y};
    var pointobj={
        "A" : [point.x,point.y+(N/(2*Math.sin(36)))],
        "B" : [point.x-(N/2),point.y-(N*Math.cos(36)/(4*Math.sin(36)))],
        "C" : [point.x+(N/(4*Math.sin(18))),10+point.y+(N/(4*Math.cos(18)))],
        "D" : [point.x-(N/(4*Math.sin(18))),10+point.y+(N/(4*Math.cos(18)))],
        "E" : [point.x+(N/2),point.y-(N*Math.cos(36)/(4*Math.sin(36)))]
    };
    var pathArray = new Array();
    pathArray.push(" M",pointobj.A[0],",",pointobj.A[1]);
    pathArray.push(" L",pointobj.B[0],",",pointobj.B[1]);
    pathArray.push(" L",pointobj.C[0],",",pointobj.C[1]);
    pathArray.push(" L",pointobj.D[0],",",pointobj.D[1]);
    pathArray.push(" L",pointobj.E[0],",",pointobj.E[1]);
    pathArray.push(" L",pointobj.A[0],",",pointobj.A[1]);
    pointArray.push(pointobj);//记录各层五边形定点坐标点
    var p=pathArray.join("");
    return p;
}

//五边形五角添加文本信息
creatLevel.prototype.setText= function(N,X,Y){
    this.svg.append("text")
        .attr("x",X-35)
        .attr("y",Y+(N/(2*Math.sin(36)))-10)
        .text("JS/HTML/CSS");
    this.svg.append("text")
        .attr("x",X-(N/2)-40)
        .attr("y",Y-(N*Math.cos(36)/(4*Math.sin(36)))+5)
        .text("Java");
    this.svg.append("text")
        .attr("x",X+(N/(4*Math.sin(18)))-30)
        .attr("y",30+Y+(N/(4*Math.cos(18))))
        .text("NodeJs");
    this.svg.append("text")
        .attr("x",X-(N/(4*Math.sin(18))))
        .attr("y",30+Y+(N/(4*Math.cos(18))))
        .text("Reactjs");
    this.svg.append("text")
        .attr("x",X+(N/2))
        .attr("y",Y-(N*Math.cos(36)/(4*Math.sin(36)))+5)
        .text("Grunt等技术工具");
}
//绘制能力线
creatLevel.prototype.creatline = function(war){
    var pathArray = new Array();
    pathArray.push(" M",pointArray[1].A[0],",",pointArray[1].A[1]);
    pathArray.push(" L",pointArray[2].B[0],",",pointArray[2].B[1]);
    pathArray.push(" L",pointArray[3].C[0],",",pointArray[3].C[1]);
    pathArray.push(" L",pointArray[4].D[0],",",pointArray[4].D[1]);
    pathArray.push(" L",pointArray[4].E[0],",",pointArray[4].E[1]);
    pathArray.push(" L",pointArray[1].A[0],",",pointArray[1].A[1]);
    var p=pathArray.join("");
    return p;
}
/*pathArray.push(" M",100,",",100+(N/(2*Math.sin(36))));//N
 pathArray.push(" L",100+(N/(4*Math.sin(18))),",",100+(N/(4*Math.cos(18))));//M
 pathArray.push(" L",100+(N/2),",",100-(N*Math.cos(36)/(4*Math.sin(36))));//G
 pathArray.push(" L",100-(N/2),",",100-(N*Math.cos(36)/(4*Math.sin(36))));//F
 pathArray.push(" L",100-(N/(4*Math.sin(18))),",",100+(N/(4*Math.cos(18))));//E
 pathArray.push(" L",100,",",100+(N/(2*Math.sin(36))));//N*/
