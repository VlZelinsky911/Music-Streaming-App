import React from 'react'
import History from '../../../../components/pages/History/History';

export const metadata = {
  title: "Wavely - Listening history",
  description: "Wavely is a most popular music streaming service in the world",
  icons: {
    icon: "/wavely_logo_title_green.png",
  },
};

export default function HistoryPage() {
  return (
    <History/>
  )
}