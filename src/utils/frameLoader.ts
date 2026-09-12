// Optimized frame loader with pre-decoding and aggressive prefetching

export const getFrameUrl = (folder: string, frameIndex: number): string => {
  const padIndex = String(frameIndex).padStart(3, '0');
  return `/${folder}/ezgif-frame-${padIndex}.jpg`;
};

class FrameCache {
  private cache: Map<string, HTMLImageElement> = new Map();
  private loadingSet: Set<string> = new Set();
  private listeners: Set<() => void> = new Set();

  public getKey(folder: string, frameIndex: number): string {
    return `${folder}_${frameIndex}`;
  }

  public getFrame(folder: string, frameIndex: number, maxFrames: number): HTMLImageElement | null {
    const clampedIndex = Math.max(1, Math.min(maxFrames, Math.round(frameIndex)));
    const key = this.getKey(folder, clampedIndex);

    const img = this.cache.get(key);
    if (img && img.complete && img.naturalWidth > 0) {
      // Trigger speculative load of next 10 frames in direction
      this.preloadRange(folder, clampedIndex, clampedIndex + 12, maxFrames);
      return img;
    }

    // Trigger load for this frame and immediate neighbors
    this.requestLoad(folder, clampedIndex, maxFrames);

    // Fallback: search for nearest loaded frame
    return this.findNearestLoaded(folder, clampedIndex, maxFrames);
  }

  public requestLoad(folder: string, frameIndex: number, maxFrames: number) {
    const key = this.getKey(folder, frameIndex);
    if (this.cache.has(key) || this.loadingSet.has(key)) return;

    this.loadingSet.add(key);
    const img = new Image();
    img.src = getFrameUrl(folder, frameIndex);

    img.onload = () => {
      if ('decode' in img) {
        img.decode().then(() => {
          this.cache.set(key, img);
          this.loadingSet.delete(key);
          this.notify();
        }).catch(() => {
          this.cache.set(key, img);
          this.loadingSet.delete(key);
          this.notify();
        });
      } else {
        this.cache.set(key, img);
        this.loadingSet.delete(key);
        this.notify();
      }
    };

    img.onerror = () => {
      this.loadingSet.delete(key);
    };

    // Speculatively load surrounding frames
    this.preloadRange(folder, Math.max(1, frameIndex - 5), Math.min(maxFrames, frameIndex + 8), maxFrames);
  }

  public preloadRange(folder: string, startIdx: number, endIdx: number, maxFrames: number) {
    for (let i = startIdx; i <= endIdx; i++) {
      if (i < 1 || i > maxFrames) continue;
      const key = this.getKey(folder, i);
      if (!this.cache.has(key) && !this.loadingSet.has(key)) {
        this.loadingSet.add(key);
        const img = new Image();
        img.src = getFrameUrl(folder, i);
        img.onload = () => {
          this.cache.set(key, img);
          this.loadingSet.delete(key);
        };
        img.onerror = () => {
          this.loadingSet.delete(key);
        };
      }
    }
  }

  private findNearestLoaded(folder: string, targetIndex: number, maxFrames: number): HTMLImageElement | null {
    for (let delta = 1; delta < 40; delta++) {
      const p1 = targetIndex - delta;
      if (p1 >= 1) {
        const img1 = this.cache.get(this.getKey(folder, p1));
        if (img1 && img1.complete && img1.naturalWidth > 0) return img1;
      }
      const p2 = targetIndex + delta;
      if (p2 <= maxFrames) {
        const img2 = this.cache.get(this.getKey(folder, p2));
        if (img2 && img2.complete && img2.naturalWidth > 0) return img2;
      }
    }
    const firstImg = this.cache.get(this.getKey(folder, 1));
    if (firstImg && firstImg.complete && firstImg.naturalWidth > 0) return firstImg;

    return null;
  }

  public preloadChapterKeyframes(folder: string, maxFrames: number) {
    // Immediate preloading of early frames and regular keyframes
    for (let i = 1; i <= Math.min(25, maxFrames); i++) {
      this.requestLoad(folder, i, maxFrames);
    }
    for (let i = 26; i <= maxFrames; i += 6) {
      this.requestLoad(folder, i, maxFrames);
    }
    this.requestLoad(folder, maxFrames, maxFrames);
  }

  public subscribe(cb: () => void): () => void {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }
}

export const frameCache = new FrameCache();
