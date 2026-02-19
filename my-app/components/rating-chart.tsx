"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { StarRating } from "./star-rating"
import { Rating } from "@/types/review"

export const description = "A bar chart"



const chartConfig = {
  desktop: {
    label: "Ratings: ",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

interface RatingChartProps {
    average_rating: number,
    ratings: Rating[],
    maxStars?: number,
}

const RatingChart = ({
    average_rating,
    ratings,
    maxStars = 5
}: RatingChartProps) => {
  // const chartData = [
  //   { rating: "0 star ratings", ratings: 186 },
  //   { rating: "☆ ratings", ratings: 305 },
  //   { rating: "☆☆ star ratings", ratings: 237 },
  //   { rating: "☆☆☆ star ratings", ratings: 73 },
  //   { rating: "☆☆☆☆ star ratings", ratings: 209 },
  //   { rating: "☆☆☆☆☆ star ratings", ratings: 214 },
  // ]
  const chartData = ratings.map((r) => {
    return {
      rating: r.rating > 0 ? `${"☆".repeat(r.rating)}` : "-☆ ratings",
      count: r.count
    }
  })

  return (
    <Card className="w-full">
        <CardHeader>
            <CardTitle>Ratings</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex flex-col items-center gap-2 shrink-0 border-r border-border/50 pr-8">
                <span className="text-4xl font-bold">{average_rating}</span>
                <StarRating rating={average_rating} size="lg" />
                <span className="text-xs text-muted-foreground">
                    145,832 ratings
                </span>
            </div>
            <div className="h-30 flex-1">
                <ChartContainer config={chartConfig} className="h-full w-full">
                    <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Tooltip 
                      cursor={false} 
                      content={
                        <ChartTooltipContent 
                          // hideLabel
                          hideIndicator
                          formatter={(value) => (
                            <span className="font-bold tabular-nums">
                                {Number(value).toLocaleString()}
                            </span>
                          )}
                          // indicator="dashed" 
                        />
                      } 
                    />
                    <Bar 
                        dataKey="count"
                        fill="var(--color-desktop)" 
                        radius={4} 
                        barSize={40}
                    />
                    {/* We hide the axes for a cleaner "mini-graph" look */}
                    <XAxis dataKey="rating" hide />
                    <YAxis hide />
                    </BarChart>
                </ChartContainer>
            </div>
        </CardContent>
    </Card>
  ) 
};

export default RatingChart;