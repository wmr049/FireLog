function initChartBar(chart, dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions) {

    var emailsSubscriptionChart = Chartist.Bar(chart, dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

    md.startAnimationForBarChart(emailsSubscriptionChart);

}