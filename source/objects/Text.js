"use strict";

import {Object2D} from "../Object2D.js";

function Text()
{
	Object2D.call(this);

	/**
	 * Text value.
	 */
	this.text = "";

	/**
	 * Font of the text.
	 */
	this.font = "16px Arial";

	/**
	 * Color (style) of the text.
	 */
	this.color = "#000000";
}

Text.prototype = Object.create(Object2D.prototype);

Text.prototype.draw = function(context)
{
	context.font = this.font;
	context.textAlign = "center";
	context.fillStyle = this.color;

	context.fillText(this.text, 0, 0);
};

export {Text};
