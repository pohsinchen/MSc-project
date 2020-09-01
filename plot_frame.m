%% Plot the frame
%%
%% Input:
%%  NO.1 para. = the index of figure
%%  NO.2 para. = the range of X coordinates to plot
%%  NO.3 para. = the range of Y coordinates to plot
%%  NO.4 para. = the dataset
%%  NO.5 para. = the frame number
%%  NO.6 para. = the colour for frame to plot
%%  NO.7 para. = the activation for showing title (0=false, 1=true)
function plot_frame(index, area_x, area_y, data, frame_num, colour, is_title)

    figure(index);
    scatter(data(frame_num).X.', data(frame_num).Y.', 60, colour, '.');

    if (is_title == 1)
    
        title(sprintf('Frame %d', frame_num));
        
    end

    xlim(area_x);
    ylim(area_y);
    xlabel('Position X');
    ylabel('Position Y');

end