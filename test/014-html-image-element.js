import assert from 'assert'
import { mkdtemp, rm, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import path from 'path'
import { after, before, describe, it } from 'mocha'
import { createHTMLDocument } from '../main-module.js'

describe('HTMLImageElement', function () {
  let directory
  let imagePath

  before(async function () {
    directory = await mkdtemp(path.join(tmpdir(), 'svgdom-'))
    imagePath = path.join(directory, 'pixel.png')
    await writeFile(
      imagePath,
      Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
        'base64'
      )
    )
  })

  after(async function () {
    await rm(directory, { recursive: true })
  })

  it('loads image dimensions from a file', async function () {
    const image = createHTMLDocument().createElement('img')
    const loaded = new Promise((resolve, reject) => {
      image.addEventListener('load', resolve)
      image.addEventListener('error', () => reject(new Error('load failed')))
    })

    image.src = imagePath
    await loaded

    assert.strictEqual(image.naturalWidth, 1)
    assert.strictEqual(image.naturalHeight, 1)
    assert.strictEqual(image.complete, true)
  })
})
