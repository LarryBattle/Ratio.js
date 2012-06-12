

// source code for $.fn.getComments()
$(function () {
    /**
     * $.fn.getComments() is used to extract the html comments from a HTML elements.
     *
     * @author Larry Battle <http://bateru.com/news/contact-me>
     * @license MIT
     * @date June 11, 2012
     * @version 0.1
     * @args {boolean} asArray - If true, returns an array of the comments values.
    Otherwise returns jquery objects of the node comments.
     * @example
    HTML:
    <div id="example">I am a div. <!--Duh!--></div>
    
    Javascript:
    $("#example").getComments(true) // returns [ "Duh!" ]
     */
    var getCommentsFromEl = function (el, asArray) {
        var result,
        $el = $(el).contents();
        result = $el.filter(function () {
                return this.nodeType == 8;
            });
        if (asArray) {
            result = $.makeArray(result.map(function () {
                        return this.nodeValue;
                    }));
        }
        return result;
    };
    $.fn.getComments = function (asArray) {
        return getCommentsFromEl(this, asArray);
    };
});
