%% Plot the costs over frames
%%
%% Input:
%%  NO.1 para. = the index of figure
%%  NO.2 para. = the range of X coordinates to plot
%%  NO.3 para. = the range of Y coordinates to plot
%%  NO.4 para. = the dataset
%%  NO.5 para. = the matches of the corresponding dataset
%%  NO.6 para. = the number of first frame
%%  NO.7 para. = the number of second frame
%%  NO.8 para. = the colour for frame 1 to plot
%%  NO.9 para. = the colour for frame 2 to plot
%%  NO.10 para. = the activation for showing title (0=false, 1=true)
function plot_cost(index, mean, median, frame_number, is_title)

    figure(index);

    plot(frame_number, mean, frame_number, median);

    if (is_title == 1)
    
        title(sprintf('The costs of Mean and Median over frames'));
        
    end
    
    xlabel('The frame number');
    ylabel('Cost');
    legend('Mean','Median')

end