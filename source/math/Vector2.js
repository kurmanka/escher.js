"use strict";


/** 
 * Class representing a 2D vector. A 2D vector is an ordered pair of numbers (labeled x and y), which can be used to represent points in space, directions, etc.
 *
 * @class
 */
function Vector2(x, y)
{
	this.x = x || 0;
	this.y = y || 0;
}

Vector2.prototype.set = function(x, y)
{
	this.x = x;
	this.y = y;
};

Vector2.prototype.setScalar = function(scalar)
{
	this.x = scalar;
	this.y = scalar;
};

Vector2.prototype.clone = function()
{
	return new Vector2(this.x, this.y);
};

Vector2.prototype.copy = function(v)
{
	this.x = v.x;
	this.y = v.y;
};

Vector2.prototype.add = function(v)
{
	this.x += v.x;
	this.y += v.y;
};

Vector2.prototype.addScalar = function(s)
{
	this.x += s;
	this.y += s;
};

Vector2.prototype.addVectors = function(a, b)
{
	this.x = a.x + b.x;
	this.y = a.y + b.y;
};

Vector2.prototype.addScaledVector = function(v, s)
{
	this.x += v.x * s;
	this.y += v.y * s;
};

Vector2.prototype.sub = function(v)
{
	this.x -= v.x;
	this.y -= v.y;
};

Vector2.prototype.subScalar = function(s)
{
	this.x -= s;
	this.y -= s;
};

Vector2.prototype.subVectors = function(a, b)
{
	this.x = a.x - b.x;
	this.y = a.y - b.y;
};

Vector2.prototype.multiply = function(v)
{
	this.x *= v.x;
	this.y *= v.y;
};

Vector2.prototype.multiplyScalar = function(scalar)
{
	this.x *= scalar;
	this.y *= scalar;
};

Vector2.prototype.divide = function(v)
{
	this.x /= v.x;
	this.y /= v.y;
};

Vector2.prototype.divideScalar = function(scalar)
{
	return this.multiplyScalar(1 / scalar);
};

Vector2.prototype.min = function(v)
{
	this.x = Math.min(this.x, v.x);
	this.y = Math.min(this.y, v.y);
};

Vector2.prototype.max = function(v)
{
	this.x = Math.max(this.x, v.x);
	this.y = Math.max(this.y, v.y);
};

Vector2.prototype.clamp = function(min, max)
{
	// assumes min < max, componentwise
	this.x = Math.max(min.x, Math.min(max.x, this.x));
	this.y = Math.max(min.y, Math.min(max.y, this.y));
};

Vector2.prototype.clampScalar = function(minVal, maxVal)
{
	this.x = Math.max(minVal, Math.min(maxVal, this.x));
	this.y = Math.max(minVal, Math.min(maxVal, this.y));
};

Vector2.prototype.clampLength = function(min, max)
{
	var length = this.length();

	return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
};

Vector2.prototype.floor = function()
{
	this.x = Math.floor(this.x);
	this.y = Math.floor(this.y);
};

Vector2.prototype.ceil = function()
{
	this.x = Math.ceil(this.x);
	this.y = Math.ceil(this.y);
};

Vector2.prototype.round = function()
{
	this.x = Math.round(this.x);
	this.y = Math.round(this.y);
};

Vector2.prototype.roundToZero = function()
{
	this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
	this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
};

Vector2.prototype.negate = function()
{
	this.x = -this.x;
	this.y = -this.y;

	return this;
};

Vector2.prototype.dot = function(v)
{
	return this.x * v.x + this.y * v.y;
};

Vector2.prototype.cross = function(v)
{
	return this.x * v.y - this.y * v.x;
};

Vector2.prototype.lengthSq = function()
{
	return this.x * this.x + this.y * this.y;
};

Vector2.prototype.length = function()
{
	return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector2.prototype.manhattanLength = function()
{
	return Math.abs(this.x) + Math.abs(this.y);
};

Vector2.prototype.normalize = function()
{
	return this.divideScalar(this.length() || 1);
};

/**
 * Computes the angle in radians with respect to the positive x-axis
 */
Vector2.prototype.angle = function()
{
	var angle = Math.atan2(this.y, this.x);

	if(angle < 0)
	{
		angle += 2 * Math.PI;
	}
	
	return angle;
};

Vector2.prototype.distanceTo = function(v)
{
	return Math.sqrt(this.distanceToSquared(v));
};

Vector2.prototype.distanceToSquared = function(v)
{
	var dx = this.x - v.x;
	var dy = this.y - v.y;

	return dx * dx + dy * dy;
};

Vector2.prototype.manhattanDistanceTo = function(v)
{
	return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
};

Vector2.prototype.setLength = function(length)
{
	return this.normalize().multiplyScalar(length);
};

Vector2.prototype.lerp = function(v, alpha)
{
	this.x += (v.x - this.x) * alpha;
	this.y += (v.y - this.y) * alpha;
};

Vector2.prototype.lerpVectors = function(v1, v2, alpha)
{
	return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
};

Vector2.prototype.equals = function(v)
{
	return ((v.x === this.x) && (v.y === this.y));
};

Vector2.prototype.fromArray = function(array, offset)
{
	if(offset === undefined) offset = 0;

	this.x = array[offset];
	this.y = array[offset + 1];
};

Vector2.prototype.toArray = function(array, offset)
{
	if(array === undefined) array = [];
	if(offset === undefined) offset = 0;

	array[offset] = this.x;
	array[offset + 1] = this.y;

	return array;
};

Vector2.prototype.rotateAround = function(center, angle)
{
	var c = Math.cos(angle);
	var s = Math.sin(angle);

	var x = this.x - center.x;
	var y = this.y - center.y;

	this.x = x * c - y * s + center.x;
	this.y = x * s + y * c + center.y;
};

export {Vector2};
