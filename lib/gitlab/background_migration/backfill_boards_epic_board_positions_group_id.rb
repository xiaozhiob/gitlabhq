# frozen_string_literal: true

module Gitlab
  module BackgroundMigration
    # rubocop: disable Migration/BackgroundMigrationBaseClass -- BackfillDesiredShardingKeyJob inherits from BatchedMigrationJob.
    class BackfillBoardsEpicBoardPositionsGroupId < BackfillDesiredShardingKeyJob
      operation_name :backfill_boards_epic_board_positions_group_id
      feature_category :portfolio_management
    end
    # rubocop: enable Migration/BackgroundMigrationBaseClass
  end
end
