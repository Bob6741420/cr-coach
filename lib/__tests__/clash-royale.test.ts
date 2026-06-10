import { formatTag } from '../clash-royale'

describe('formatTag', () => {
  it('prepends # if missing', () => { expect(formatTag('ABC123')).toBe('#ABC123') })
  it('keeps # if already present', () => { expect(formatTag('#ABC123')).toBe('#ABC123') })
  it('uppercases', () => { expect(formatTag('abc123')).toBe('#ABC123') })
})
