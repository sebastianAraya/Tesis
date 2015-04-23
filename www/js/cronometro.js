function cronometro($scope,time){
      var canvas=document.getElementById('mycanvas');
      var ctx=canvas.getContext('2d');
      var cWidth=canvas.width;
      var cHeight=canvas.height;
      var countTo=time;
      var min=Math.floor(countTo/60);
      var sec=countTo-(min*60);
      var counter=0;
      var angle=270;
      var inc=360/countTo; 
     
      function drawScreen() {
        
        //======= reset canvas
        
        ctx.fillStyle="#fff";
        ctx.fillRect(0,0,cWidth,cHeight);
        
        //========== base arc
        
        ctx.beginPath();
        ctx.strokeStyle="#252424";
        ctx.lineWidth=7;
        ctx.arc(cWidth/2,cHeight/2,40,(Math.PI/180)*0,(Math.PI/180)*360,false);
        ctx.stroke();
        ctx.closePath();
        
        //========== dynamic arc
        
        ctx.beginPath();
        ctx.strokeStyle="#FFCB71";
        ctx.lineWidth=7;
        ctx.arc(cWidth/2,cHeight/2,40,(Math.PI/180)*270,(Math.PI/180)*angle,false);
        ctx.stroke();
        ctx.closePath();
        
        //======== inner shadow arc
        
        grad=ctx.createRadialGradient(cWidth/2,cHeight/2,80,cWidth/2,cHeight/2,115);
        grad.addColorStop(0.0,'rgba(0,0,0,.4)');
        grad.addColorStop(0.5,'rgba(0,0,0,0)');
        grad.addColorStop(1.0,'rgba(0,0,0,0.4)');
        
        ctx.beginPath();
        ctx.strokeStyle=grad;
        ctx.lineWidth=7;
        ctx.arc(cWidth/2,cHeight/2,40,(Math.PI/180)*0,(Math.PI/180)*360,false);
        ctx.stroke();
        ctx.closePath();
        
        //======== bevel arc
        
        grad=ctx.createLinearGradient(cWidth/2,0,cWidth/2,cHeight);
        grad.addColorStop(0.0,'#6c6f72');
        grad.addColorStop(0.5,'#252424');
        
        ctx.beginPath();
        ctx.strokeStyle=grad;
        ctx.lineWidth=1;
        ctx.arc(cWidth/2,cHeight/2,93,(Math.PI/180)*0,(Math.PI/180)*360,true);
        ctx.stroke();
        ctx.closePath();
        
        //====== emboss arc
        
        grad=ctx.createLinearGradient(cWidth/2,0,cWidth/2,cHeight);
        grad.addColorStop(0.0,'transparent');
        grad.addColorStop(0.98,'#6c6f72');
        
        ctx.beginPath();
        ctx.strokeStyle=grad;
        ctx.lineWidth=1;
        ctx.arc(cWidth/2,cHeight/2,107,(Math.PI/180)*0,(Math.PI/180)*360,true);
        ctx.stroke();
        ctx.closePath();
        
        //====== Labels
        
        var textColor='#646464';
        var textSize="10";
        var fontFace="helvetica, arial, sans-serif";
        
        ctx.fillStyle=textColor;
        ctx.font=textSize+"px "+fontFace;
        ctx.fillText('MIN',cWidth/2-25,cHeight/2-15);
        ctx.fillText('SEG',cWidth/2+4,cHeight/2-5);
        
        //====== Values
        
        
        
        ctx.fillStyle='#6292ae';
        
        if (min>9) {
          ctx.font='40px '+fontFace;
          ctx.fillText('9' ,cWidth/2-24,cHeight/2+20);
          
          ctx.font='20px '+fontFace;
          ctx.fillText('+' ,cWidth/2-35,cHeight/2+10);      
        }
        else {
          ctx.font='40px '+fontFace;
          ctx.fillText(min ,cWidth/2-27,cHeight/2+21);
        }
        
        ctx.font='25px '+fontFace;
        if (sec<10) {
          ctx.fillText('0'+sec,cWidth/2+3,cHeight/2+20);
        } 
        else {
          ctx.fillText(sec,cWidth/2+1,cHeight/2+20);
        }
        
        if (sec<=0 && counter<countTo) {
          angle+=inc;
          counter++;
          min--;
          sec=59; 
        } else
          if (counter>=countTo) {
            sec=0;
            min=0;
            clearInterval(run);
            $scope.continuar();
          } else {
            angle+=inc;
            counter++;
            sec--;
          }
      }
  
  var run = setInterval(drawScreen,1000);

 };     
