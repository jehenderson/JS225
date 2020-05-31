function makeCar(accelRate, deccelRate) {
  return {
    speed: 0,
    accelRate: rate,
    accelerate: function() {
      this.speed += this.accelRate;
    },
    deccelRate: deccelRate,
    brake: function() {
      this.speed = (this.speed - this.deccelRate) >= 0 ? (this.speed - this.deccelRate) : 0;
    },
  };
}

var hatchback = makeCar(9);
