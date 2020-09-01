%% Plot the probability density function of disparities
%%
%% Input:
%%  NO.1 para. = the index of figure
%%  NO.2 para. = the dataset of disparities
%%  NO.3 para. = the probability density function
%%  NO.4 para. = the boundary
%%  NO.5 para. = the activation for showing title (0=false, 1=true)
function plot_pdf(index, matches_dist, nd, boundary, is_title)

    figure(index);
    plot(matches_dist.', nd, '.', [0 3], [boundary boundary], 'red');

    if (is_title == 1)

        title(sprintf('The normal distribution of the distances'));

    end

    xlim([0 3]);
    ylim([0 0.5]);
    xlabel('The length of distance, x');
    ylabel('Probability Density Function, pdf(x)');

end