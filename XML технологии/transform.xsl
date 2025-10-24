<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
      xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

  <!-- Определяем ключи -->
  <!-- Группировка городов -->
  <xsl:key name="cityKey" match="item" use="@city"/>
  <!-- Группировка компаний внутри города -->
  <xsl:key name="orgKey" match="item" use="concat(@city,'|',@org)"/>

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <meta charset="UTF-8"/>
        <title>Группировка компаний по городам</title>
        <style>
          body { font-family: Arial, sans-serif; }
          h2 { color: darkblue; margin-top: 20px; }
          h3 { color: darkgreen; margin-left: 20px; }
          table { border-collapse: collapse; margin-left: 40px; }
          th, td { border: 1px solid #999; padding: 5px 10px; }
          th { background-color: #ddd; }
        </style>
      </head>
      <body>
        <h1>Компании и товары по городам</h1>

        <!-- Проходим по уникальным городам -->
        <xsl:for-each select="orgs/item[generate-id() = generate-id(key('cityKey', @city)[1])]">
          <h2><xsl:value-of select="@city"/></h2>

          <!-- Для каждого города — выводим уникальные компании -->
          <xsl:for-each select="key('cityKey', @city)[generate-id() = generate-id(key('orgKey', concat(@city,'|',@org))[1])]">
            <h3><xsl:value-of select="@org"/></h3>

            <table>
              <tr>
                <th>Товар</th>
                <th>Количество</th>
              </tr>

              <!-- Товары для компании -->
              <xsl:for-each select="key('orgKey', concat(@city,'|',@org))">
                <tr>
                  <td><xsl:value-of select="@title"/></td>
                  <td><xsl:value-of select="@value"/></td>
                </tr>
              </xsl:for-each>
            </table>
          </xsl:for-each>
        </xsl:for-each>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>