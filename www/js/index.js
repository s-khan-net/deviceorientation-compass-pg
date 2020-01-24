var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
   
    onDeviceReady: function() {
        var compass = document.getElementById('compass');
        if(window.DeviceOrientationEvent) {
  
          window.addEventListener('deviceorientation', function(event) {
                var alpha,beta,gamma;
                //Check for iOS property
                if(event.webkitCompassHeading) {
                  alert('ios');
                  alpha = event.webkitCompassHeading;
                  //Rotation is reversed for iOS
                  compass.style.WebkitTransform = 'rotate(-' + alpha + 'deg)';
                }
                //non iOS
                else {
                  alpha = event.alpha;
                  beta = event.beta;
                  gamma = event.gamma;
                  // if(!window.chrome) {
                  //   alert('!chrome');
                  //   //Assume Android stock (this is crude, but good enough for our example) and apply offset
                  //   webkitAlpha = alpha-270;
                  // }
                }
                document.getElementById('main').innerHTML = 'alpha:'+alpha+', beta:'+beta+', gamma:'+gamma;
                //compass.style.Transform = 'rotate(' + alpha + 'deg)';
                alpha = alpha+270;
                compass.style.WebkitTransform = 'rotate('+ alpha + 'deg)';
                //Rotation is reversed for FF
                //compass.style.MozTransform = 'rotate(-' + alpha + 'deg)'; 
              }, false);
        }
    }
}