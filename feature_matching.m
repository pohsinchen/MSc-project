%% Match the features between the predictor and target with a sigma
%%
%% Input:
%%  NO.1 para. = the positions of the predictors
%%  NO.2 para. = the positions of the targets
%%  NO.3 para. = the sigma
%%
%% Output:
%%  NO.1 para. = the position of the matches
%%  NO.2 para. = the distances between the features and their matches
function [matches, matches_dist] = feature_matching(p1, p2, sigma)

    % Initialise
    p1_size = size(p1, 1);
    p2_size = size(p2, 1);
    G = zeros(p1_size, p2_size);
    matches = zeros(p1_size, 2);
    matches_dist = zeros(p1_size, 1);

    %% Caculate a Gaussian matrix of the distance between i and j
    for i = 1: p1_size

        for j = 1: p2_size

            dist_ij = norm(p1(i, :) - p2(j, :)); % The distance of echo i and j point
            G(i, j) = exp(- dist_ij ^ 2 / (2 * sigma ^ 2)); % Calculate by the Gaussian form

        end

    end

    %% Calculate the SVD value by the G matrix
    [T, D, U] = svd(G);
    E = eye(size(D)); % As the paper, change the diagonal positive values to 1
    P = T * E * U'; % The formula in the paper as well

    [M, I] = max(P.'); % Choose the greatest points

    %% Store the matched points and its distance from the first frame
    for i = 1: p1_size

        matches(i, :) = p2(I(i), :); % Store the matched-point position
        matches_dist(i) = norm(p1(i, :) - matches(i, :)); % Store the distance from the first-frame point to its matched point in the second frame

    end

end