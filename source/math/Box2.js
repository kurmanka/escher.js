"use strict";

/**
 * Box is described by a minimum and maximum points.
 *
 * Can be used for collision detection with points and other boxes.
 */
function Box2(min, max)
{
	this.min = (min !== undefined) ? min : new Vector2();
	this.max = (max !== undefined) ? max : new Vector2();
}

Object.assign(Box2.prototype,
{
	set: function(min, max)
	{
		this.min.copy(min);
		this.max.copy(max);

		return this;
	},

	setFromPoints: function(points)
	{
		this.min = new Vector2(+Infinity, +Infinity);
		this.max = new Vector2(-Infinity, -Infinity);

		for(var i = 0, il = points.length; i < il; i++)
		{
			this.expandByPoint(points[i]);
		}

		return this;
	},

	setFromCenterAndSize: function(center, size)
	{
		var v1 = new Vector2();
		var halfSize = v1.copy(size).multiplyScalar(0.5);
		this.min.copy(center).sub(halfSize);
		this.max.copy(center).add(halfSize);

		return this;
	},

	clone: function()
	{
		var box = new Box2();
		box.copy(this);
		return box;
	},

	copy: function(box)
	{
		this.min.copy(box.min);
		this.max.copy(box.max);

		return this;
	},


	isEmpty: function()
	{
		// this is a more robust check for empty than ( volume <= 0 ) because volume can get positive with two negative axes
		return (this.max.x < this.min.x) || (this.max.y < this.min.y);
	},

	getCenter: function(target)
	{
		return this.isEmpty() ? target.set(0, 0) : target.addVectors(this.min, this.max).multiplyScalar(0.5);
	},

	getSize: function(target)
	{
		return this.isEmpty() ? target.set(0, 0) : target.subVectors(this.max, this.min);
	},

	expandByPoint: function(point)
	{
		this.min.min(point);
		this.max.max(point);

		return this;
	},

	expandByVector: function(vector)
	{
		this.min.sub(vector);
		this.max.add(vector);

		return this;
	},

	expandByScalar: function(scalar)
	{
		this.min.addScalar(-scalar);
		this.max.addScalar(scalar);

		return this;
	},

	containsPoint: function(point)
	{
		return point.x < this.min.x || point.x > this.max.x || point.y < this.min.y || point.y > this.max.y ? false : true;
	},

	containsBox: function(box)
	{
		return this.min.x <= box.min.x && box.max.x <= this.max.x && this.min.y <= box.min.y && box.max.y <= this.max.y;
	},

	getParameter: function(point, target)
	{
		// This can potentially have a divide by zero if the box
		// has a size dimension of 0.

		return target.set(
			(point.x - this.min.x) / (this.max.x - this.min.x),
			(point.y - this.min.y) / (this.max.y - this.min.y)
		);
	},

	intersectsBox: function(box)
	{
		// using 4 splitting planes to rule out intersections
		return box.max.x < this.min.x || box.min.x > this.max.x || box.max.y < this.min.y || box.min.y > this.max.y ? false : true;
	},

	clampPoint: function(point, target)
	{
		return target.copy(point).clamp(this.min, this.max);
	},

	distanceToPoint: function(point)
	{
		var v = new Vector2();
		var clampedPoint = v.copy(point).clamp(this.min, this.max);
		return clampedPoint.sub(point).length();
	},

	intersect: function(box)
	{
		this.min.max(box.min);
		this.max.min(box.max);

		return this;
	},

	union: function(box)
	{
		this.min.min(box.min);
		this.max.max(box.max);

		return this;
	},

	translate: function(offset)
	{
		this.min.add(offset);
		this.max.add(offset);

		return this;
	},

	equals: function(box)
	{
		return box.min.equals(this.min) && box.max.equals(this.max);
	}
});

//export {Box2};
