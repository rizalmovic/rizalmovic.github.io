var App = {};

$(function(){

    App = {
        setupTabs: function(){
            $('.menu .item').tab();
        },
        setupPlayers: function(){
            $.get('/data/carrom.json', function(response){
                var html = '';
                for(var i = 0; i < response.length; i++) {
                    html += `
                        <div class="item">
                            <img class="ui avatar image" src="https://api.adorable.io/avatars/285/${response[i].NAME}@mitrais.png">
                            <div class="content">
                                <a
                                    class="header player-detail"
                                    data-stats=${JSON.stringify(response[i])}
                                >
                                    ${response[i].NAME}
                                </a>
                            </div>
                        </div>
                    `;
                }

                $('#players').html(html);

                $('#players').on('click', '.player-detail', function(){
                    var data = $(this).data('stats');
                    var stats = [];
                    
                    for (const k in data) {
                        if(k !== 'NAME') {
                            stats.push({
                                key: k,
                                value: data[k]
                            });
                        }
                    }

                    AmCharts.makeChart('statistic', {
                        type: "radar",
                        theme: "light",
                        dataProvider: stats,
                        valueAxes: [
                            {
                                axisTitleOffset: 20,
                                minimum: 0,
                                axisAlpha: 0.15
                            }
                        ],
                        startDuration: 2,
                        graphs: [{
                            balloonText: "[[value]] litres of beer per year",
                            bullet: "round",
                            lineThickness: 2,
                            valueField: "value"
                        }],
                        categoryField: "key",
                    })
                });
            });
        },
        init: function(){
            this.setupTabs();
            this.setupPlayers();
        }
    };

    App.init();
});