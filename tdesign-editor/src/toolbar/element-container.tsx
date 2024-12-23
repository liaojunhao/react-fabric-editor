import React, { useRef, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { OverflowList, Boundary, Popover, Position, Button } from '@blueprintjs/core';

const Container = styled.div``;

export const extendToolbar = ({
  type,
  usedItems,
  components,
}: {
  type: string;
  usedItems: Array<string | undefined>;
  components: any;
}) => {
  const newItems = [];
  Object.keys(components).forEach((o) => {
    if (0 === o.toLowerCase().indexOf(type)) {
      if (components[o]) {
        usedItems.includes(o) || newItems.push(o);
      } else {
        console.error(`error: Toolbar has invalid React component "${o}"`);
      }
    }
  });
  return usedItems.filter((e) => Boolean(e)).concat(newItems);
};

export const ElementContainer = ({ items, itemRender }: { items: any; itemRender: any }) => {
  const [divWidth, setDivWidth] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  const updateContainerWidth = () => {
    if (divRef.current === null) {
      return;
    }

    const parentElement = divRef.current.parentElement;
    if (!parentElement) {
      return;
    }

    let siblingsWidth = 0;
    Array.from(parentElement.children).forEach((child) => {
      if (child !== divRef.current) {
        siblingsWidth += child.clientWidth;
      }
    });
    const newWidth = Math.max(20, parentElement.clientWidth - siblingsWidth - 10);
    setDivWidth(newWidth);
  };

  useLayoutEffect(() => {
    updateContainerWidth();
  });

  useLayoutEffect(() => {
    const e = divRef.current.parentElement.parentElement;
    if (window.ResizeObserver) {
      const t = new ResizeObserver(updateContainerWidth);
      return t.observe(e), () => t.unobserve(e);
    }
    {
      const e = setInterval(updateContainerWidth, 100);
      return () => clearInterval(e);
    }
  }, []);

  return (
    <Container
      style={{ width: divWidth + 'px' }}
      ref={divRef}
      className="bp5-navbar-group bp5-align-left"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <OverflowList
        items={items}
        style={{ width: '100%', gap: 5 }}
        visibleItemRenderer={itemRender}
        collapseFrom={Boundary.END}
        overflowRenderer={(e) => (
          <Popover
            content={
              <div
                style={{ padding: '10px', display: 'flex' }}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                {e.map(itemRender)}
              </div>
            }
            position={Position.BOTTOM}
          >
            <Button
              icon="more"
              minimal={true}
              style={{ marginLeft: '10px' }}
              onMouseDownCapture={(event) => {
                event.preventDefault();
              }}
            ></Button>
          </Popover>
        )}
      ></OverflowList>
    </Container>
  );
};
