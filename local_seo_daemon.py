#!/usr/bin/env python3
"""
=============================================================================
BioGravity Local SEO Publishing Daemon (local_seo_daemon.py)
=============================================================================

Mirrors cloud_seo_daemon.py to provide identical capabilities for local
execution, cron jobs, and background workers.
"""

import sys
from cloud_seo_daemon import main

if __name__ == "__main__":
    main()
