document.addEventListener("DOMContentLoaded", function() {
    $(document).ready(function() {
        const contentWrap = $('.content-wrap');
        let touchStartY = 0;
        let startFontSize = 0;
        let touchTimeout = null;
        const MIN_FONT_SIZE = 8;
        const MAX_FONT_SIZE = 72;

        // Common function to adjust font size
        function adjustFontSize(element, newSize) {
            if (newSize >= MIN_FONT_SIZE && newSize <= MAX_FONT_SIZE) {
                element.css("font-size", newSize + "px");
            }
        }

        // Mouse wheel event handler
        contentWrap.on('wheel', function(e) {
            e.preventDefault();
            const currentSize = parseInt($(this).css('font-size'), 10);
            const newSize = currentSize + (e.originalEvent.deltaY > 0 ? 1 : -1);
            adjustFontSize($(this), newSize);
        });

        // Touch event handlers
        contentWrap
            .on('touchstart', function(e) {
                e.preventDefault();
                touchStartY = e.originalEvent.touches[0].clientY;
                startFontSize = parseInt($(this).css('font-size'), 10);
            })
            .on('touchmove', function(e) {
                e.preventDefault();
                
                // Throttle touch events for better performance
                if (touchTimeout) {
                    clearTimeout(touchTimeout);
                }

                touchTimeout = setTimeout(() => {
                    const currentY = e.originalEvent.touches[0].clientY;
                    const deltaY = touchStartY - currentY;
                    const fontSizeChange = Math.floor(deltaY / 20);
                    const newSize = startFontSize + fontSizeChange;
                    
                    adjustFontSize($(this), newSize);
                }, 16); // ~60fps
            });
    });
});
