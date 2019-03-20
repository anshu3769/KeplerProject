# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import Snapshot


snapshots = Snapshot()

snapshots['test_player_firstname_query 1'] = {
    'data': {
        'players': [
            {
                'firstName': 'Anshu'
            },
            {
                'firstName': 'Bunny'
            }
        ]
    }
}

snapshots['test_player_lastname_query 1'] = {
    'data': {
        'players': [
            {
                'lastName': 'Tomar'
            },
            {
                'lastName': 'Tomar'
            }
        ]
    }
}

snapshots['test_words_query 1'] = {
    'data': {
        'words': [
            {
                'word': 'eat'
            },
            {
                'word': 'fun'
            }
        ]
    }
}
