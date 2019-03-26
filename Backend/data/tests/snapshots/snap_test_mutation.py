# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import Snapshot


snapshots = Snapshot()

snapshots['test_create_player_mutation 1'] = {
    'data': {
        'createPlayer': {
            'player': {
                'firstName': 'Kepler',
                'lastName': 'Group',
                'userName': 'KG'
            }
        }
    }
}

snapshots['test_update_score_mutation 1'] = {
    'data': {
        'updateScores': {
            'score': {
                'userName': 'KG',
                'value': 50
            }
        }
    }
}

snapshots['test_update_top_score_mutation 1'] = {
    'data': {
        'updateTopScores': {
            'score': {
                'userName': 'KG',
                'value': 50
            }
        }
    }
}
