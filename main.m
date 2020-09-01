%% Load the data
load('./Exp016abs_point_cloud.mat');

%% Initialise
data = PC_clustered; % (PC_clustered or PC_raw)
start_frame = 1;
last_frame = length(PC_clustered);
boundary = 0.2; % The boundary to classify object and noise
export_act = 0; % (1=true, 0=false)

mean_array = [];
median_array = [];
frame_number_array = [];
total = 0;

% Show the figures
fig_1 = figure(1); % Plot with noise
fig_2 = figure(2); % Plot the original second frame
fig_3 = figure(3); % Plot PDF
fig_4 = figure(4); % Plot the de-noised second frame
fig_5 = figure(5); % Plot the first frame
fig_6 = figure(6); % Plot without noise
fig_7 = figure(7); % Plot alpha shape
fig_8 = figure(8); % Plot the costs over frames

area_x = [-3 3]; % X coordinates to plot
area_y = [0 5]; % Y coordinates to plot
area_z = [-3 3]; % Z coordinates to plot

%% For each frame
for num = start_frame: last_frame - 1
    
    %% Clear the figures
    clf(fig_1);
    clf(fig_2);
    clf(fig_3);
    clf(fig_4);
    clf(fig_5);
    clf(fig_6);
    clf(fig_7);

    %% Initialise
    frame_1 = num;
    frame_2 = frame_1 + 1;
    p1 = [data(frame_2).X.', data(frame_2).Y.']; % Based on the second frame
    p2 = [data(frame_1).X.', data(frame_1).Y.']; % to find the matches in the first frame
    p1_size = size(p1, 1);
    p2_size = size(p2, 1);

    %% Threshold of small noise
    if (p1_size >= 20  && p2_size >= 20)

        %% Estimate the best solution with a suitable sigma
        [matches, matches_dist, mean, median, sigma] = estimate_sigma(p1, p2, 0.01, 0.01, 5.0, 3);      

        median_array = [median_array, median];
        mean_array = [mean_array, mean];
        frame_number_array = [frame_number_array, frame_1];

        %% Normal distribution
        nd = normpdf(matches_dist.');

        %% Plot with noise
%         plot_combination(1, area_x, area_y, data, matches, frame_1, frame_2, 'blue', 'red', 0)
        
        %% Plot the original second frame
%         plot_frame(2, area_x, area_y, data, frame_2, 'red', 0);

        %% De-noising
        if (min(nd) < boundary)
            disp(frame_2);
            total = total + 1;
            data(frame_2).X(nd<boundary) = [];
            data(frame_2).Y(nd<boundary) = [];
            data(frame_2).D(nd<boundary) = [];
            data(frame_2).SNR(nd<boundary) = [];
            matches(nd<boundary, :) = [];
            
        end

        %% Plot PDF
%         plot_pdf(3, matches_dist, nd, boundary, 0);

        %% Plot the de-noised second frame
%         plot_frame(4, area_x, area_y, data, frame_2, 'red', 0);

        %% Plot the first frame
%         plot_frame(5, area_x, area_y, data, frame_1, 'blue', 0);

        %% Plot without noise
%         plot_combination(6, area_x, area_y, data, matches, frame_1, frame_2, 'blue', 'red', 0);

        %% Plot alpha shape
%         plot_alphaShape(7, area_x, area_y, area_z, data, frame_1, 0);

        %% Pause
%         pause(20);

    end

    %% Print the number of frame
    disp(frame_1);

end

%% Plot the costs over frames
% plot_cost(8, mean_array, median_array, frame_number_array, 0);

%% Export alpha-shapes
export_alpha_shape(data, export_act); % Export
