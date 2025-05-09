"use client";
import React from "react";
//
import { Line } from "react-chartjs-2";

export default function HydrogenChart({ data }) {
  const chartData = {
    labels: ["1h", "2h", "3h", "4h"],
    datasets: [
      {
        label: "Production H₂ (kg)",
        data: data,
        borderColor: "green",
        backgroundColor: "rgba(0,255,0,0.2)",
      },
    ],
  };

  return <Line data={chartData} />;
}
//
export default function Index() {
  return function MainComponent({
    data = [],
    width = 600,
    height = 400,
    margin = { top: 20, right: 30, bottom: 40, left: 50 },
    xAxisLabel = "Date",
    yAxisLabel = "Valeur",
    lineColor = "#10b981",
    backgroundColor = "white",
    animate = true,
    title = "",
    chartType = "line",
    isDarkMode = false,
    showDataPoints = true,
    enableZoom = false,
    onDataPointSelect = () => {},
    config = { interactive: true, darkMode: false },
  }) {
    const svgRef = useRef(null);
    const tooltipRef = useRef(null);
    const [zoomTransform, setZoomTransform] = useState(null);

    useEffect(() => {
      if (!data.length || !svgRef.current) return;

      const svg = d3.select(svgRef.current);
      svg.selectAll("*").remove();

      const contentWidth = width - margin.left - margin.right;
      const contentHeight = height - margin.top - margin.bottom;

      const xScale = d3
        .scaleTime()
        .domain(d3.extent(data, (d) => new Date(d.date)))
        .range([0, contentWidth]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.value) * 1.1])
        .range([contentHeight, 0]);

      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      if (enableZoom) {
        const zoom = d3
          .zoom()
          .scaleExtent([1, 5])
          .on("zoom", (event) => {
            g.attr("transform", event.transform);
            setZoomTransform(event.transform);
          });

        svg.call(zoom);
      }

      const line = d3
        .line()
        .x((d) => xScale(new Date(d.date)))
        .y((d) => yScale(d.value))
        .curve(d3.curveCatmullRom);

      const gridLines = g
        .append("g")
        .attr("class", "grid-lines")
        .style(
          "stroke",
          isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
        )
        .style("stroke-dasharray", "4,4");

      gridLines
        .selectAll("line.horizontal")
        .data(yScale.ticks(5))
        .enter()
        .append("line")
        .attr("x1", 0)
        .attr("x2", contentWidth)
        .attr("y1", (d) => yScale(d))
        .attr("y2", (d) => yScale(d));

      g.append("g")
        .attr("transform", `translate(0,${contentHeight})`)
        .attr("class", isDarkMode ? "text-gray-300" : "text-gray-600")
        .call(d3.axisBottom(xScale))
        .append("text")
        .attr("x", contentWidth / 2)
        .attr("y", 35)
        .attr("fill", "currentColor")
        .attr("text-anchor", "middle")
        .text(xAxisLabel);

      g.append("g")
        .attr("class", isDarkMode ? "text-gray-300" : "text-gray-600")
        .call(d3.axisLeft(yScale))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -40)
        .attr("x", -contentHeight / 2)
        .attr("fill", "currentColor")
        .attr("text-anchor", "middle")
        .text(yAxisLabel);

      if (chartType === "line" || chartType === "area") {
        if (chartType === "area") {
          const area = d3
            .area()
            .x((d) => xScale(new Date(d.date)))
            .y0(contentHeight)
            .y1((d) => yScale(d.value))
            .curve(d3.curveCatmullRom);

          const areaPath = g
            .append("path")
            .datum(data)
            .attr("fill", `${lineColor}33`)
            .attr("d", area);

          if (animate) {
            areaPath
              .style("opacity", 0)
              .transition()
              .duration(1500)
              .style("opacity", 1);
          }
        }

        const path = g
          .append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", lineColor)
          .attr("stroke-width", 2)
          .attr("d", line);

        if (animate) {
          const pathLength = path.node().getTotalLength();
          path
            .attr("stroke-dasharray", pathLength)
            .attr("stroke-dashoffset", pathLength)
            .transition()
            .duration(2000)
            .attr("stroke-dashoffset", 0);
        }
      } else if (chartType === "bar") {
        const barWidth = (contentWidth / data.length) * 0.8;

        g.selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", (d) => xScale(new Date(d.date)) - barWidth / 2)
          .attr("y", contentHeight)
          .attr("width", barWidth)
          .attr("fill", lineColor)
          .attr("height", 0)
          .transition()
          .duration(animate ? 1000 : 0)
          .attr("y", (d) => yScale(d.value))
          .attr("height", (d) => contentHeight - yScale(d.value));
      }

      if (showDataPoints && config.interactive) {
        g.selectAll(".dot")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", "dot")
          .attr("cx", (d) => xScale(new Date(d.date)))
          .attr("cy", (d) => yScale(d.value))
          .attr("r", 4)
          .attr("fill", isDarkMode ? "#fff" : "#fff")
          .attr("stroke", lineColor)
          .attr("stroke-width", 2)
          .style("opacity", 0)
          .on("click", (event, d) => onDataPointSelect(d))
          .transition()
          .delay((d, i) => i * 100)
          .duration(500)
          .style("opacity", 1);
      }

      const tooltip = d3.select(tooltipRef.current);
      const focus = g.append("g").style("display", "none");
      focus.append("circle").attr("r", 5).attr("fill", lineColor);

      if (config.interactive) {
        g.append("rect")
          .attr("width", contentWidth)
          .attr("height", contentHeight)
          .style("fill", "none")
          .style("pointer-events", "all")
          .on("mouseover", () => {
            focus.style("display", null);
            tooltip.style("display", "block");
          })
          .on("mouseout", () => {
            focus.style("display", "none");
            tooltip.style("display", "none");
          })
          .on("mousemove", (event) => {
            const bisect = d3.bisector((d) => new Date(d.date)).left;
            const x0 = xScale.invert(d3.pointer(event)[0]);
            const i = bisect(data, x0, 1);
            const d0 = data[i - 1];
            const d1 = data[i];
            const d = x0 - new Date(d0.date) > new Date(d1.date) - x0 ? d1 : d0;

            focus.attr(
              "transform",
              `translate(${xScale(new Date(d.date))},${yScale(d.value)})`
            );
            tooltip
              .style("display", "block")
              .style("left", `${xScale(new Date(d.date)) + margin.left + 10}px`)
              .style("top", `${yScale(d.value) + margin.top - 10}px`)
              .html(
                `Date: ${new Date(
                  d.date
                ).toLocaleDateString()}<br/>Valeur: ${d.value.toFixed(2)}`
              );
          });
      }

      if (title) {
        svg
          .append("text")
          .attr("x", width / 2)
          .attr("y", margin.top / 2)
          .attr("text-anchor", "middle")
          .attr(
            "class",
            `font-roboto font-bold text-lg ${
              isDarkMode ? "text-gray-200" : "text-gray-800"
            }`
          )
          .text(title);
      }
    }, [
      data,
      width,
      height,
      margin,
      xAxisLabel,
      yAxisLabel,
      lineColor,
      animate,
      title,
      chartType,
      isDarkMode,
      showDataPoints,
      enableZoom,
      config,
      onDataPointSelect,
    ]);

    return (
      <div
        className={`relative font-crimson-text ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg p-4`}
      >
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className={`${isDarkMode ? "bg-gray-800" : "bg-white"}`}
        />
        <div
          ref={tooltipRef}
          className={`absolute hidden ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-800"
          } p-2 rounded shadow-lg border text-sm`}
        />
      </div>
    );
  };
}