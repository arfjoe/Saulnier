class KeyFigureHandler {

    /**
     * 
     * @param {NodeList} elements 
     * @param {Object} options 
     */
    constructor(elements, options) {
        this.elements = elements;
        this.options = this.parseOptions(options);
        this.onObserve = this.onObserve.bind(this);
        this.observer = new IntersectionObserver(this.onObserve, {});
        for (const element of elements) {
            this.observer.observe(element);
        }
        this.animate = this.animate.bind(this);
    }

    /**
     * 
     * @param {Object} options 
     * @returns {Object}
     */
    parseOptions(options) {
        const defaultOptions = {
            animate: true,
            detectPercentage: false,
            animationDuration: 2000,
            frameDuration: 500,
            detectBigNumbers: true,
        }
        return { ...defaultOptions, ...options };
    }

    /**
     * 
     * @param {IntersectionObserverEntry} entries 
     * @param {IntersectionObserver} observer 
     */
    onObserve(entries, observer) {
        entries.forEach(entry => {

            if (!entry.isIntersecting)
                return;

            if (this.options.animate)
                this.animate(entry.target);

            observer.unobserve(entry.target);

        })
    }

    /**
     * 
     * @param {Element} element 
     */
    animate(element) {
        // Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
        const frameDuration = this.options.frameDuration / 60;
        // Use that to calculate how many frames we need to complete the animation
        const totalFrames = Math.round(this.options.animationDuration / frameDuration);
        // An ease-out function that slows the count as it progresses
        const easeOutQuad = t => t * (2 - t);

        let frame = 0;
        let hasPercentage = false;

        let sanitizedElement = element.textContent.trim().replace(new RegExp(" ", "g"), "");

        if (this.options.detectPercentage && sanitizedElement.includes('%'))
            hasPercentage = true;

        const countTo = parseInt(sanitizedElement, 10);
        // Start the animation running 60 times per second
        if (!isNaN(countTo)) {
            const counter = setInterval(() => {

                frame++;
                // Calculate our progress as a value between 0 and 1
                // Pass that value to our easing function to get our
                // progress on a curve
                const progress = easeOutQuad(frame / totalFrames);
                // Use the progress value to calculate the current count
                const currentCount = Math.round(countTo * progress);

                // If the current count has changed, update the element
                if (parseInt(element.textContent, 10) !== currentCount) {
                    element.textContent = `${drupalSettings && this.options.detectBigNumbers ?
                        currentCount.toLocaleString(drupalSettings.langCode) : currentCount} ${hasPercentage ? '%' : ''}`;
                }

                // If we’ve reached our last frame, stop the animation
                if (frame === totalFrames) {
                    clearInterval(counter);
                }
            }, frameDuration);
        }
    }
}

export { KeyFigureHandler };
