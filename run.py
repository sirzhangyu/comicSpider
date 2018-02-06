import os

import argparse

os.system('phantomjs chapter_links.js http://www.manhuagui.com/comic/8428/')

with open('chapter_links') as f:
    chapter_links = f.read().replace('[', '').replace(']', '').split('\n')
    import pdb; pdb.set_trace()
    for chapter_link in chapter_links:
        os.system('phantomjs ChapterSpider.js {}'.format(chapter_link))
