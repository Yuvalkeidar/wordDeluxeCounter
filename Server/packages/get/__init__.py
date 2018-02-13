#!/usr/bin/env python
import os
from query_string import query_string

__all__ = ["GET"]

GET = dict()
if "QUERY_STRING" in os.environ:
    QUERY_STRING = os.environ["QUERY_STRING"]
    qs = query_string(QUERY_STRING)
    for k in qs:
        v = qs[k]
        GET[k] = v
