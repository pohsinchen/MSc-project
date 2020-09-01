%% Plot the alpha-shape
%%
%% Input:
%%  NO.1 para. = the index of figure
%%  NO.2 para. = the range of X coordinates to plot
%%  NO.3 para. = the range of Y coordinates to plot
%%  NO.4 para. = the range of Z coordinates to plot
%%  NO.5 para. = the dataset
%%  NO.6 para. = the frame number
%%  NO.7 para. = the activation for showing title (0=false, 1=true)
function plot_alphaShape(index, area_x, area_y, area_z, data, frame_num, is_title)

    figure(index);

    shp = alpha_shape(data, frame_num);
%     shp = alphaShape(double(data(frame_num).X.'), double(data(frame_num).Y.'), double(data(frame_num).D.'), inf);
%     pc = criticalAlpha(shp,'one-region');
% 	shp.Alpha = pc;
    
    plot(shp);

    if (is_title)

        title(sprintf('The alpha shape of Frame %d', frame_num));

    end
    
    xlim(area_x);
    ylim(area_y);
    zlim(area_z);
    xlabel('x');
    ylabel('y');
    zlabel('Velocity');

end