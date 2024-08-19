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
                Alphabet (Indian Sign Language)
              </CardTitle>
              <CardDescription>
                The DEF-ISL app makes the learning of sign language easy,
                accessible and interesting. Packed with 5000+ easy-to-understand
                signs and phrases, in-built videos, illustrations, this
                easy-to-navigate app can be used both by adults and children who
                are deaf or hearing impaired
              </CardDescription>
            </CardHeader>
            <div className="p-4">
              <YoutubeEmbed embedId="Vj_13bdU4dU" />
            </div>
          </Card>
        </div>
        <div>
          <Card className="hover:scale-105 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl font-tommymedium font-medium">
                Alphabets in Indian Sign Language
              </CardTitle>
              <CardDescription>
                Indian Sign Language, ISL is essential for fostering inclusivity
                and communication in a diverse society. ISL enables millions of
                deaf and hard-of-hearing individuals in India to express
                themselves and connect with others.
              </CardDescription>
            </CardHeader>
            <div className="p-4">
              <YoutubeEmbed embedId="R6aARjwRQec" />
            </div>
          </Card>
        </div>
        <div>
          <Card className="hover:scale-105 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl font-tommymedium font-medium">
                Alphabet in Indian Sign Language
              </CardTitle>
              <CardDescription>
                By learning ISL, you contribute to breaking down communication
                barriers, promoting social integration, and supporting the
                rights of the deaf community. It also enhances cultural
                understanding and helps bridge gaps between hearing and
                non-hearing people
              </CardDescription>
            </CardHeader>
            <div className="p-4">
              <YoutubeEmbed embedId="ltzSNNa13W8" />
            </div>
          </Card>
        </div>
        <div>
          <Card className="hover:scale-105 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl font-tommymedium font-medium">
                Alphabets in Indian Sign Language
              </CardTitle>
              <CardDescription>
                Learning ISL is a step towards building a more inclusive
                society. It empowers you to communicate with the deaf community,
                fostering understanding and connection. You contribute to
                breaking down barriers and supporting equal opportunities for
                everyone
              </CardDescription>
            </CardHeader>
            <div className="p-4">
              <YoutubeEmbed embedId="WrjfUvmWzko" />
            </div>
          </Card>
        </div>
        <div>
          <Card className="hover:scale-105 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl font-tommymedium font-medium">
                Numbers in Indian Sign Language
              </CardTitle>
              <CardDescription>
                Mastering numbers in ISL allows you to convey accurate
                information in contexts like banking, shopping, and scheduling.
                It also enhances the ability to engage in educational and
                professional settings where numerical data is frequently
                exchanged.
              </CardDescription>
            </CardHeader>
            <div className="p-4">
              <YoutubeEmbed embedId="PVVSQvPyoK0" />
            </div>
          </Card>
        </div>
        <div>
          <Card className="hover:scale-105 transition-all">
            <CardHeader>
              <CardTitle className="text-2xl font-tommymedium font-medium">
                Indian Sign Language Numbers
              </CardTitle>
              <CardDescription>
                Understanding ISL numbers is a foundational skill that supports
                more complex conversations and contributes to the overall
                fluency in the language, making interactions more seamless and
                meaningful. Hence, Learning numbers ISL is crucial for effective
                communication
              </CardDescription>
            </CardHeader>
            <div className="p-4">
              <YoutubeEmbed embedId="lhmMZ5q2chs" />
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Learn;
