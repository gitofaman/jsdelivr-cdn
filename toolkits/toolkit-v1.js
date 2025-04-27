$(document).ready(function() {
    // Store references and state
    var popups = {}; // { 0: { main: element, isOpen: false } }

    // Initialize popups
    $('[popup]').each(function() {
        var main = $(this);
        var popupIndex = main.attr('popup');
        var closeButton = main.find('[close]');
        var content = main.find('[popup-content]')

        popups[popupIndex] = {
            main: main,
            isOpen: false,
            content: content
        };

        // Close button click event
        closeButton.on('click', function() {
            closePopup(popupIndex);
        });

        // Initially hide all popups
        gsap.set(main, {
            opacity: 0,
            display: 'none'
        });
    });

    // Open Popup
    var openPopup = function(popupIndex) {
        var popup = popups[popupIndex];
        if (!popup) return console.error('Popup not found:', popupIndex);
        if (popup.isOpen) return; // Already open

        gsap.set(popup.main, {
            display: 'flex'
        });
        popup.main.trigger('opening')
        gsap.to(popup.main, {
            opacity: 1,
            duration: 0.3,
            onComplete: function() {
                popup.isOpen = true;
                popup.main.trigger('popup-opened');
            }
        });
    };

    // Close Popup
    var closePopup = function(popupIndex) {
        var popup = popups[popupIndex];
        if (!popup) return console.error('Popup not found:', popupIndex);
        if (!popup.isOpen) return; // Already closed
        popup.main.trigger('closing')

        gsap.to(popup.main, {
            opacity: 0,
            duration: 0.3,
            onComplete: function() {
                gsap.set(popup.main, {
                    display: 'none'
                });
                popup.isOpen = false;
                popup.main.trigger('popup-closed');
            }
        });
    };

    // Popup Trigger Buttons
    $('[popup-trigger]').each(function() {
        var trigger = $(this);
        var popupIndex = trigger.attr('popup-trigger');

        trigger.on('click', function() {
            openPopup(popupIndex);
        });
    });
    window.fddPopups = popups;

    $(document).trigger('fdd-popups-loaded')

})
