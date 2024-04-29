import { HierarchyData } from '../types/types';
import { OrgChart } from 'd3-org-chart';
import { useLayoutEffect, useRef, useState } from 'react';

export const HiearchyChart = ({ data }: { data: HierarchyData[] }) => {
  const d3Container = useRef(null);
  const [chart, setChart] = useState<OrgChart<HierarchyData> | null>(null);


  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (data && d3Container.current) {
      const newChart = new OrgChart<HierarchyData>();
      setChart(newChart);

      if(chart) {  
        chart
        .container(d3Container.current)
        .data(data)
        .nodeWidth(() => 300)
        .nodeContent(function (d) {
          const borderColors = ['border-l-red-700', 'border-l-red-500', 'border-l-blue-500', 'border-l-slate-800', 'border-l-slate-500', 'border-l-slate-200'];
          const borderColor = borderColors[d.depth % borderColors.length];

          return `
            <div class="absolute bottom-0 w-full p-4 bg-slate-50 border border-gray-300 ${borderColor} border-l-4 rounded shadow-md">
              <div class="font-bold text-lg text-slate-700">${d.data.name} ${d.data.surname}</div>
              <div class="flex justify-between">
                <div class="text-sm text-slate-600">${d.data.role_name}</div>
                <div class="text-sm italic text-slate-600">${d.data.office}</div>
              </div>
              ${d.data.shift !== null ? `<div class="text-sm italic absolute -top-3 -right-2 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-slate-600">${d.data.shift}</div>` : ''}
              <div class="mt-2 flex justify-between text-slate-500">
                <div>Manages: ${d.data._directSubordinates}</div>
                <div>Oversees: ${d.data._totalSubordinates}</div>
              </div>
            </div>
          `;
        })
  
        .render();
      }
   
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, d3Container.current]);

  return (
    <div>
    <div ref={d3Container} />
  </div>
  );
};
