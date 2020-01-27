var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
   
    onDeviceReady: function() {
        var compass = document.getElementById('compass');
        if(window.DeviceOrientationEvent) {
  
          window.addEventListener('deviceorientation', function(event) {
                var alpha,beta,gamma,webkitAlpha;
                latQ = 21.422508; //coordinates of qibla
                lonQ = 39.826188;
                latC = 12.354321;
                lonC = 76.603293;
                //Check for iOS property
                if(event.webkitCompassHeading) {
                  alert('ios');
                  webkitAlpha = event.webkitCompassHeading;
                  //Rotation is reversed for iOS
                  //compass.style.WebkitTransform = 'rotate(-' + alpha + 'deg)';
                }
                //non iOS
                else {
                  alpha = event.alpha;
                  beta = event.beta;
                  gamma = event.gamma;
                  if(!window.chrome) {
                    //alert('!chrome');
                    //Assume Android stock (this is crude, but good enough for our example) and apply offset
                    webkitAlpha = alpha-270;
                  }
                }
                // if(beta>=35 ){
                //   $('#main').html('please keep your device in a horizontal position');
                // }
                // if(beta>=-35 ){
                //   $('#main').html('please keep your device in a horizontal position');
                // }
                // else{
                var magneticHeading = compassHeading(event.alpha,event.beta,event.gamma);
                var northrotation = (webkitAlpha+90)+'deg';
                deg = bearing(latC, lonC, latQ, lonQ).toFixed(14);
                //direction = (deg >= 0) ? deg : 360 + deg;
                var qibladir = (Math.round(deg) + (Math.round(webkitAlpha) + 90))+'deg';
                //disp = Math.round(direction) + Math.round(magneticHeading);
                $('#main').html('alpha:'+alpha+'<br> beta:'+beta+'<br> gamma:'+gamma+'<br> heading:'+magneticHeading+'<br> bearing:'+deg+'<br> qibladir:'+qibladir+'<br> webkitalpha:'+webkitAlpha);
                //compass.style.Transform = 'rotate(' + alpha + 'deg)';
                //deg =  (deg * Math.PI / 180) * 180 / Math.PI;
                // direction = (deg >= 0) ? deg : 360 + deg;
                // disp = Math.round(direction) + Math.round(360 - magneticHeading);
                //compass.style.WebkitTr\ansform = 'rotate('+ alpha + 'deg)';
                $('.arrow_box').css('height',$('#qiblaCircle').width()+'px');
                $('.north-needle').css('height',($('#qiblaCircle').width()+5)+'px');
                //$('.deg0').css('transform','translate('+($('#qiblaCircle').width()/2)+'px)');
                $('.north-needle').css('margin-left',$('#qiblaCircle').width()/2+'px');
                $('.north-needle').css('-webkit-transform', 'rotate(' + northrotation + ')');
                $('.arrow_box').css('-webkit-transform', 'rotate(' + qibladir + ')');
                //Rotation is reversed for FF
                //compass.style.MozTransform = 'rotate(-' + alpha + 'deg)'; 
                //}
              }, false);
        }
    }
}
function compassHeading( alpha, beta, gamma ) {
  var degtorad = Math.PI / 180;
  var _x = beta  ? beta  * degtorad : 0; // beta value
  var _y = gamma ? gamma * degtorad : 0; // gamma value
  var _z = alpha ? alpha * degtorad : 0; // alpha value

  var cX = Math.cos( _x );
  var cY = Math.cos( _y );
  var cZ = Math.cos( _z );
  var sX = Math.sin( _x );
  var sY = Math.sin( _y );
  var sZ = Math.sin( _z );

  // Calculate Vx and Vy components
  var Vx = - cZ * sY - sZ * sX * cY;
  var Vy = - sZ * sY + cZ * sX * cY;

  // Calculate compass heading
  var compassHeading = Math.atan( Vx / Vy );

  // Convert compass heading to use whole unit circle
  if( Vy < 0 ) {
    compassHeading += Math.PI;
  } else if( Vx < 0 ) {
    compassHeading += 2 * Math.PI;
  }

  return compassHeading * ( 180 / Math.PI ); // Compass Heading (in degrees)

}
function bearing(lat1, lon1, lat2, lon2) {
  lat1 = lat1.toRad(); lat2 = lat2.toRad();
  var dLon = (lon2-lon1).toRad();

  var y = Math.sin(dLon) * Math.cos(lat2);
  var x = Math.cos(lat1)*Math.sin(lat2) -
          Math.sin(lat1)*Math.cos(lat2)*Math.cos(dLon);
  return Math.atan2(y, x).toBrng();
}
// extend Number object with methods for converting degrees/radians

Number.prototype.toRad = function() {  // convert degrees to radians
  return this * Math.PI / 180;
}

Number.prototype.toDeg = function() {  // convert radians to degrees (signed)
  return this * 180 / Math.PI;
}

Number.prototype.toBrng = function() {  // convert radians to degrees (as bearing: 0...360)
  return (this.toDeg()+360) % 360;
}