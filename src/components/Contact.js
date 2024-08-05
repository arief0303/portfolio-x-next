import React from 'react'
import { overrideThemeVariables, Card, CardContent, Subtitle1, Subtitle2, H5, Body2, CardAction, Button, CardHeader, H6, IconButton, Icon, CardMedia, Spacer } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'

const Contact = () => {
  return (
    <Card rounded className='p-10 px-20 flex flex-col md:flex-row mx-5 md:mx-56'>
      <div className='flex flex-col items-center md:mr-8 mb-4 md:mb-0'>
        <img
          src='/images/profile.jpg'
          alt='Profile Picture'
          className='w-24 h-24 rounded-full mb-4 object-cover'
        />
        <div className='text-center'>
          <h2 className='text-3xl font-bold mb-2 text-black'>Arief R. Syauqie</h2>
          <h3 className='text-xl font-semibold mb-4 text-gray-600'>Creative Developer/Designer</h3>
        </div>
      </div>
      <div className='text-left'>
        <h2 className='text-3xl font-bold mb-4 text-black'>Contact Me</h2>
        <p className='mb-4 text-black'>Feel free to reach out to me on WhatsApp.</p>
                <Button
          rounded
          color='var(--primary)'
          onClick={() => window.open('https://wa.me/+6288214970734', '_blank', 'noopener noreferrer')}
        >
          Chat on WhatsApp
        </Button>
      </div>
    </Card>
  )
}

export default Contact