import YoutubeEmbed from "@/components/YoutubeEmbed";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Learn = () => {
  return (
    <main>
      <div className="container px-10 mt-10 mb-[-20px]">
        <h1 className="text-xl font-tommymedium font-medium">
          <span className="text-secondary">Learn sign language</span> with these
          videos!
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-4 p-6 scale-90">
        <div>
          <Card className="hover:scale-105 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl font-tommymedium font-medium">
                Learn ASL Alphabet Video
              </CardTitle>
              <CardDescription>
                This video teaches the ASL alphabet, allowing users to click on
                specific letters for review, and suggests an alternative video
                for memory tips.
              </CardDescription>
            </CardHeader>
            <div className="p-4">
              <YoutubeEmbed embedId="6_gXiBe9y9A" />
            </div>
          </Card>
        </div>
        <div>
          <Card className="hover:scale-105 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl font-tommymedium font-medium">
                25 ASL Signs You Need to Know
              </CardTitle>
              <CardDescription>
                This video introduces beginners to 25 essential ASL signs,
                covering hand shape, palm orientation, movement, location, and
                non-manual signals for each sign.
              </CardDescription>
            </CardHeader>
            <div className="p-4">
              <YoutubeEmbed embedId="0FcwzMq4iWg" />
            </div>
          </Card>
        </div>
        <div>
          <Card className="hover:scale-105 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl font-tommymedium font-medium">
                20+ Basic Sign Language Phrases
              </CardTitle>
              <CardDescription>
                The video covers common American Sign Language (ASL) phrases and
                questions for beginners. It teaches greetings like 'hello',
                'hey', and 'what's up'
              </CardDescription>
            </CardHeader>
            <div className="p-4">
              <YoutubeEmbed embedId="v1desDduz5M" />
            </div>
          </Card>
        </div>
        <div>
          <Card className="hover:scale-105 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl font-tommymedium font-medium">
                Mastering High-Frequency Signs
              </CardTitle>
              <CardDescription>
                Learn how to acquire a new language by focusing on everyday
                words and signs. Explore 10 words with multiple meanings and
                variations in sign language to enhance communication skills.
              </CardDescription>
            </CardHeader>
            <div className="p-4">
              <YoutubeEmbed embedId="jCUaMdXsI7w" />
            </div>
          </Card>
        </div>
        <div>
          <Card className="hover:scale-105 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl font-tommymedium font-medium">
                100 Basic Signs You Should Know
              </CardTitle>
              <CardDescription>
                Embark on a journey to master ASL basics with a four-part series
                teaching the initial 100 signs. Shadow, review, and practice
                these signs to kickstart your sign language conversations.
              </CardDescription>
            </CardHeader>
            <div className="p-4">
              <YoutubeEmbed embedId="qa9qSPsj840" />
            </div>
          </Card>
        </div>
        <div>
          <Card className="hover:scale-105 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl font-tommymedium font-medium">
                How to Sign - TEACHER - STUDENT
              </CardTitle>
              <CardDescription>
                Unlock the world of sign language with this educational video on
                signing 'teacher,' 'student,' and 'study.' Join ASL LOVE to
                expand your signing vocabulary and communication skills.
              </CardDescription>
            </CardHeader>
            <div className="p-4">
              <YoutubeEmbed embedId="KENbHqnozyo" />
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Learn;
