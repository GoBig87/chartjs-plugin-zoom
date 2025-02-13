describe('api', function() {
  it('should add methods to chart instance', function() {
    const chart = window.acquireChart({type: 'line'});

    expect(typeof chart.pan).toBe('function');
    expect(typeof chart.zoom).toBe('function');
    expect(typeof chart.zoomScale).toBe('function');
    expect(typeof chart.resetZoom).toBe('function');
    expect(typeof chart.getZoomLevel).toBe('function');
    expect(typeof chart.getInitialScaleBounds).toBe('function');
  });

  describe('zoom and resetZoom', function() {
    it('should accept zoom percentage as single parameter', function() {
      const chart = window.acquireChart({
        type: 'scatter',
        options: {
          scales: {
            x: {
              min: 0,
              max: 100
            },
            y: {
              min: 0,
              max: 100
            }
          }
        }
      });
      expect(chart.scales.x.min).toBe(0);
      expect(chart.scales.x.max).toBe(100);
      expect(chart.scales.y.min).toBe(0);
      expect(chart.scales.y.max).toBe(100);

      chart.zoom(1.5);
      expect(chart.scales.x.min).toBe(25);
      expect(chart.scales.x.max).toBe(75);
      expect(chart.scales.y.min).toBe(25);
      expect(chart.scales.y.max).toBe(75);

      chart.zoom(0.5);
      expect(chart.scales.x.min).toBe(12.5);
      expect(chart.scales.x.max).toBe(87.5);
      expect(chart.scales.y.min).toBe(12.5);
      expect(chart.scales.y.max).toBe(87.5);

      chart.resetZoom();
      expect(chart.scales.x.min).toBe(0);
      expect(chart.scales.x.max).toBe(100);
      expect(chart.scales.y.min).toBe(0);
      expect(chart.scales.y.max).toBe(100);
    });

    it('should accept different percentages per axis', function() {
      const chart = window.acquireChart({
        type: 'scatter',
        options: {
          scales: {
            x: {
              min: 0,
              max: 100
            },
            y: {
              min: 0,
              max: 100
            }
          }
        }
      });
      expect(chart.scales.x.min).toBe(0);
      expect(chart.scales.x.max).toBe(100);
      expect(chart.scales.y.min).toBe(0);
      expect(chart.scales.y.max).toBe(100);

      chart.zoom({x: 1.5, y: 1.25});
      expect(chart.scales.x.min).toBe(25);
      expect(chart.scales.x.max).toBe(75);
      expect(chart.scales.y.min).toBe(12.5);
      expect(chart.scales.y.max).toBe(87.5);

      chart.zoom({x: 0.75, y: 0.3});
      expect(chart.scales.x.min).toBe(18.75);
      expect(chart.scales.x.max).toBe(81.25);
      expect(chart.scales.y.min).toBe(-13.75);
      expect(chart.scales.y.max).toBe(113.75);

      chart.resetZoom();
      expect(chart.scales.x.min).toBe(0);
      expect(chart.scales.x.max).toBe(100);
      expect(chart.scales.y.min).toBe(0);
      expect(chart.scales.y.max).toBe(100);
    });
  });

  describe('getInitialScaleBounds', function() {
    it('should provide the correct initial scale bounds regardless of the zoom level', function() {
      const chart = window.acquireChart({
        type: 'scatter',
        options: {
          scales: {
            x: {
              min: 0,
              max: 100
            },
            y: {
              min: 0,
              max: 100
            }
          }
        }
      });

      chart.zoom(1);
      expect(chart.getInitialScaleBounds().x.min).toBe(0);
      expect(chart.getInitialScaleBounds().x.max).toBe(100);
      expect(chart.getInitialScaleBounds().y.min).toBe(0);
      expect(chart.getInitialScaleBounds().y.max).toBe(100);

      chart.zoom({x: 1.5, y: 1.25});
      expect(chart.getInitialScaleBounds().x.min).toBe(0);
      expect(chart.getInitialScaleBounds().x.max).toBe(100);
      expect(chart.getInitialScaleBounds().y.min).toBe(0);
      expect(chart.getInitialScaleBounds().y.max).toBe(100);
    });
  });

  describe('isZoomedOrPanned', function() {
    it('should return whether or not the page is currently zoomed', function() {
      const chart = window.acquireChart({
        type: 'scatter',
        options: {
          scales: {
            x: {
              min: 0,
              max: 100
            },
            y: {
              min: 0,
              max: 100
            }
          }
        }
      });

      expect(chart.isZoomedOrPanned()).toBe(false);

      chart.zoom(1);
      expect(chart.isZoomedOrPanned()).toBe(false);

      chart.zoom({x: 1.5, y: 1.25});
      expect(chart.isZoomedOrPanned()).toBe(true);

      chart.zoom({x: 0.25, y: 0.5});
      expect(chart.isZoomedOrPanned()).toBe(true);

      chart.resetZoom();
      expect(chart.isZoomedOrPanned()).toBe(false);
    });

    it('should return whether or not the page is currently panned', function() {
      const chart = window.acquireChart({
        type: 'scatter',
        options: {
          scales: {
            x: {
              min: 0,
              max: 100
            },
            y: {
              min: 0,
              max: 100
            }
          }
        }
      });

      expect(chart.isZoomedOrPanned()).toBe(false);

      chart.pan({x: 0, y: 0});
      expect(chart.isZoomedOrPanned()).toBe(false);

      chart.pan({x: 10});
      expect(chart.isZoomedOrPanned()).toBe(true);

      chart.resetZoom();
      expect(chart.isZoomedOrPanned()).toBe(false);
    });
  });
});
