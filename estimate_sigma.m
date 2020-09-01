%% Estimate the best solution with a suitable sigma
%%
%% Input:
%%  NO.1 para. = the positions of the predictors
%%  NO.2 para. = the positions of the targets
%%  NO.3 para. = the start of sigma
%%  NO.4 para. = the increase of sigma
%%  NO.5 para. = the end of sigma
%%  NO.6 para. = the chosen method for detecting distances (1 = Mean, 2 = Median, 3 = Both)
%%
%% Output:
%%  NO.1 para. = the positions of the matches
%%  NO.2 para. = the distances between the features and their matches
%%  NO.3 para. = the minimum cost (Mean)
%%  NO.4 para. = the minimum cost (Median)
%%  NO.5 para. = the best suitable sigma in the given range
function [best_matches, best_matches_dist, best_mean_cost, best_median_cost, best_sigma] = estimate_sigma(p1, p2, start, increase, stop, method)
    
    % Initialise
    p1_size = size(p1, 1);
    best_matches = zeros(p1_size, 2);
    best_matches_dist = zeros(p1_size, 1);
    best_cost = 100;
    best_mean_cost = 100;
    best_median_cost = 100;
    best_sigma = 0;

    %% Find the best suitable sigma in this range
    for sigma = start : increase: stop

        %% Match the features between the predictor and target with a sigma
        [matches, matches_dist] = feature_matching(p1, p2, sigma);

        %% Mean
        mean_cost = mean(abs(matches_dist - mean(matches_dist)));

        %% Median
        median_cost = mean(abs(matches_dist - median(matches_dist)));

        %% Choose a statistical method (1 = Mean, 2 = Median, 3 = Both)
        if method == 1 || (method == 3 && mean_cost < median_cost)
            
            dist = mean_cost;   

        elseif method == 2 || (method == 3 && mean_cost >= median_cost)

            dist = median_cost;

        end

        %% Update when find a lower Mean Absolute Error

        cost = mean(abs(matches_dist - dist));

        if best_cost > cost

            best_cost = cost; % The lowerest RMSE
            best_matches = matches; % The most suitable matched-point position
            best_matches_dist = matches_dist; % The most suitable matched-distane from the first-frame point
            best_sigma = sigma; % The most suitable sigma

        end

         %% Update the lowest costs (Mean and Median) 
        if best_mean_cost > mean_cost
            best_mean_cost = mean_cost;
        end

        
        if best_median_cost > median_cost
            best_median_cost = median_cost;
        end

    end  

end