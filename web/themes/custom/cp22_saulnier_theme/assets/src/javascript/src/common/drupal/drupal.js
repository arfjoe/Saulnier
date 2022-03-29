export const $ = jQuery;
export let T = {
    /**
     * Renvoie vrai si le context est root (document)
     * @param context
     */
    contextIsRoot: function( context){
        return 'HTML' === $($(context).children()[0]).prop("tagName");
    },
    /**
     * Retourne vrai si la variable est définie.
     * @param variable
     * @returns {boolean}
     */
    isDefined: function (variable) {
        return 'undefined' !== typeof variable;
    },
    /**
     * Retourne la taille de la fenêtre dans un objet avec .width et .height
     * @returns object
     */
    viewport: function () {
        var e = window, a = 'inner';
        if (!('innerWidth' in window )) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return { width : e[ a+'Width' ] , height : e[ a+'Height' ]};
    }
};
export let DrupalHelpers = {
    getBasePath() {
        return drupalSettings.path.baseUrl + drupalSettings.path.pathPrefix;
    }
};