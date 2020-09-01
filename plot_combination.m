%% Plot the frame
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
function plot_combination(index, area_x, area_y, data, matches, frame_1, frame_2, colour_1, colour_2, is_title)

    figure(index);
    % The points of frame 1 in blue
    scatter(data(frame_1).X.', data(frame_1).Y.', 60, colour_1, '.');
    hold on;

    % The line-segments of points
    figure(index);
    plot([data(frame_2).X; matches(:, 1).'], [data(frame_2).Y; matches(:, 2).']);
    hold on;

    % The points of frame 2 in red
    figure(index);
    scatter(data(frame_2).X.', data(frame_2).Y.', 60, colour_2, '.');

    if (is_title == 1)
    
        title(sprintf('Frame %d(blue) and %d(red). (Original)', frame_1, frame_2));
        
    end
    
    xlim(area_x);
    ylim(area_y);
    xlabel('Position X');
    ylabel('Position Y');

end