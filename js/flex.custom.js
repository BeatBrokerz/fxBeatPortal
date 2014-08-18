/**
 *  Customized programming which further customizes the flex integration
 *  to elements in this specific page design.
 *
 *  see: http://www.beatbrokerz.com/flex/dev
 */

flexloader.execute(function ($, App) {

    /* Wire the jplayer interface on the page to our flex app */
    App.Music.addInterface($("#jp_container_footer"));

    /* Define which playlists should be primary on the page, and reference them in our baseVars  */
    switch (App.appSettings.app_type) {
        case 'producer':
            App.baseVars.list1 = { id: 'store', icon: 'icon-disc' };
            App.baseVars.list2 = { id: 'top', icon: 'icon-bar-chart' };
            App.baseVars.list3 = { id: 'bestsellers', icon: 'icon-badge' };
            break;
        default:
            App.baseVars.list1 = { id: 'custom_0', icon: 'icon-disc' };
            App.baseVars.list2 = { id: 'custom_1', icon: 'icon-music-tone-alt' };
            App.baseVars.list3 = { id: 'custom_2', icon: 'icon-music-tone' };
    }

    /* Update spin indicators on 'load more...' buttons when we refresh playlists */
    App.on('bbflex-ajax-working', function (params) {
        if (params && params.data && params.data.music) {
            $('i.fa-refresh.load-' + params.data.music).addClass('fa-spin');
        }
    });
    App.on('bbflex-ajax-complete', function (params) {
        if (params && params.data && params.data.music) {
            $('i.fa-refresh.load-' + params.data.music).removeClass('fa-spin');
        }
    });

    /* UI Notify of playlist changes */
    App.on('bbflex-playlist-changed', function (playlist) {
        if (App.Music.currentPlaylist && playlist != App.Music.currentPlaylist) {
            alertify.log('Now listening to playlist:<br><h4>' + App.Music.playlists[playlist].title + '</h4>');
        }
    });

    /**
     *  Some of our interface items depend on app data to be ready to display correctly,
     *  so we wrap that code with App.ready()
     *  see: http://www.beatbrokerz.com/flex/dev/utilities#app-ready
     */
    App.ready(function () {

        App.baseVars.showFeaturedProducers =
            App.appSettings.bootmode != 'disabled' && (
                (App.appSettings.app_type == 'producer' && App.Producers.list().length > 1) ||
                    (App.appSettings.app_type != 'producer' && App.Producers.list().length)
                );

        // apply our bindings (see: http://www.beatbrokerz.com/flex/theme#security-implications)
        $('html').bbflex('applyBindings');

    });

});